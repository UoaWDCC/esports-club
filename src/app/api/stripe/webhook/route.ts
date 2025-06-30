/**
 * Stripe Webhook API Route
 *
 * This API endpoint handles Stripe webhook events for processing payment completions
 * and automatically creating membership records in the database.
 *
 * Endpoint: POST /api/stripe/webhook
 *
 * Security Features:
 * - Verifies webhook signatures using Stripe's webhook secret
 * - Validates event authenticity before processing
 * - Handles webhook events securely with proper error handling
 *
 * Supported Events:
 * - checkout.session.completed: Creates membership records for successful payments
 *
 * Webhook Processing Flow:
 * 1. Verify webhook signature for security
 * 2. Parse and validate the webhook event
 * 3. Handle specific event types (currently checkout.session.completed)
 * 4. Create invoice and membership records in database
 * 5. Log successful processing for monitoring
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@libs/db";
import { invoices, memberships, membershipTypes } from "@libs/db/schema";
import { env } from "@libs/env";
import { stripe } from "@libs/stripe/server";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

/**
 * POST /api/stripe/webhook
 *
 * Processes Stripe webhook events for payment completion and membership creation.
 *
 * This endpoint is called by Stripe when payment events occur. It handles the
 * checkout.session.completed event by:
 * 1. Verifying the webhook signature for security
 * 2. Extracting payment and session information
 * 3. Creating an invoice record in the database
 * 4. Creating a membership record linked to the user's profile
 * 5. Linking the membership to the appropriate membership type
 *
 * The webhook ensures that successful payments automatically grant membership
 * access without requiring manual intervention.
 *
 * @param request - NextRequest containing the webhook payload and signature
 * @returns JSON response indicating webhook processing status
 * @throws 400 if webhook signature is missing or invalid
 * @throws 500 if webhook processing fails
 */
export async function POST(request: NextRequest) {
    // Step 1: Extract the raw body and signature for webhook verification
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    // Step 2: Verify the webhook signature to ensure it's from Stripe
    try {
        event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Step 3: Process the webhook event based on its type
    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                // Only process if payment was actually successful
                if (session.payment_status === "paid") {
                    await handleSuccessfulPayment(session);
                }
                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}

/**
 * Handles successful payment completion by creating membership records
 *
 * This function processes a completed checkout session and:
 * 1. Retrieves the full session details with line items
 * 2. Extracts the user's profile ID and selected price ID
 * 3. Finds the corresponding membership type based on the product name
 * 4. Creates an invoice record for payment tracking
 * 5. Creates a membership record granting access to the user
 *
 * The function ensures that successful payments automatically grant
 * membership access without manual intervention.
 *
 * @param session - The completed Stripe checkout session
 * @throws Error if required data is missing or membership type not found
 */
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    // Step 1: Retrieve the full session with expanded line items to get complete price information
    const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
    });

    // Step 2: Extract profile ID and price ID from the session
    const profileId = expandedSession.client_reference_id;
    const priceId = expandedSession.line_items?.data[0]?.price?.id;

    // Step 3: Validate that we have the required data
    if (!profileId || !priceId) {
        console.error("Session data:", {
            profileId,
            priceId,
            sessionId: session.id,
            clientReferenceId: session.client_reference_id,
        });
        throw new Error("Missing profileId or priceId in session");
    }

    // Step 4: Get the price details to find the membership type
    const price = await stripe.prices.retrieve(priceId, {
        expand: ["product"],
    });

    const product = price.product as Stripe.Product;
    const productName = product.name;

    // Step 5: Find the membership type based on the product name
    const membershipType = await db
        .select()
        .from(membershipTypes)
        .where(eq(membershipTypes.name, productName))
        .limit(1);

    if (membershipType.length === 0) {
        throw new Error(`Membership type not found for product: ${productName}`);
    }

    // Step 6: Create invoice record for payment tracking
    const [invoice] = await db
        .insert(invoices)
        .values({
            profileId,
            type: "membership",
            description: `Payment for ${productName}`,
            status: "paid",
            paymentMethod: "Stripe",
            price: (expandedSession.amount_total || 0) / 100, // Convert from cents to dollars
        })
        .returning();

    // Step 7: Create membership record granting access to the user
    await db.insert(memberships).values({
        profileId,
        invoiceId: invoice.id,
        membershipTypeId: membershipType[0].id,
        isPaid: true,
    });

    console.log(`Successfully created membership for profile ${profileId}`);
}
