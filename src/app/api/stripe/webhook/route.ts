// Stripe webhook API route for payment events
import { NextRequest, NextResponse } from "next/server";
import { db } from "@libs/db";
import { invoices, memberships, membershipTypes } from "@libs/db/schema";
import { env } from "@libs/env";
import { stripe } from "@libs/stripe/client";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

/**
 * Handle Stripe webhook events for payment completion and membership creation.
 * @param request NextRequest with webhook payload
 * @returns JSON indicating webhook processing status
 * @throws 400 if webhook signature is missing or invalid
 * @throws 500 if webhook processing fails
 */
export async function POST(request: NextRequest) {
    console.log("🔍 Webhook received");
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
        console.error("❌ No signature found in webhook");
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }
    let event: Stripe.Event;
    // Verify webhook signature
    try {
        event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
        console.log("✅ Webhook signature verified successfully");
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    // Process event
    try {
        console.log(`📧 Processing webhook event: ${event.type}`);
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log(
                    `💳 Checkout session completed: ${session.id}, payment status: ${session.payment_status}`,
                );
                if (session.payment_status === "paid") {
                    console.log("💰 Payment confirmed, creating membership...");
                    await handleSuccessfulPayment(session);
                } else {
                    console.log(`⚠️ Payment not confirmed, status: ${session.payment_status}`);
                }
                break;
            }
            default:
                console.log(`🤷 Unhandled event type: ${event.type}`);
        }
        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("❌ Error processing webhook:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}

/**
 * Create membership and invoice after successful payment.
 * @param session Completed Stripe checkout session
 * @throws Error if required data is missing or membership type not found
 */
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    console.log("🚀 Starting handleSuccessfulPayment for session:", session.id);

    // Get full session with line items
    const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
    });
    console.log("📋 Retrieved expanded session with line items");

    // Get profile and price IDs
    const profileId = expandedSession.client_reference_id;
    const priceId = expandedSession.line_items?.data[0]?.price?.id;
    const membershipTypeId = expandedSession.metadata?.membershipTypeId;

    console.log("🔍 Session data:", {
        profileId,
        priceId,
        membershipTypeId,
        metadata: expandedSession.metadata,
    });

    if (!profileId || !priceId) {
        console.error("❌ Missing required session data:", {
            profileId,
            priceId,
            sessionId: session.id,
            clientReferenceId: session.client_reference_id,
        });
        throw new Error("Missing profileId or priceId in session");
    }

    // Get product name for invoice description
    const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
    const product = price.product as Stripe.Product;
    const productName = product.name;
    console.log(`📦 Product: ${productName}`);

    // If membershipTypeId is provided in metadata, use it directly
    let membershipTypeToUse: string;
    if (membershipTypeId) {
        console.log(`🎯 Using membershipTypeId from metadata: ${membershipTypeId}`);
        // Verify the membership type exists
        const membershipType = await db
            .select()
            .from(membershipTypes)
            .where(eq(membershipTypes.id, membershipTypeId))
            .limit(1);

        if (membershipType.length === 0) {
            console.error(`❌ Membership type not found with ID: ${membershipTypeId}`);
            throw new Error(`Membership type not found with ID: ${membershipTypeId}`);
        }
        membershipTypeToUse = membershipTypeId;
        console.log(`✅ Verified membership type exists: ${membershipTypeId}`);
    } else {
        console.log(`🔍 Fallback: searching for membership type by product name: ${productName}`);
        // Fallback to finding by product name (for backwards compatibility)
        const membershipType = await db
            .select()
            .from(membershipTypes)
            .where(eq(membershipTypes.name, productName))
            .limit(1);

        if (membershipType.length === 0) {
            console.error(`❌ Membership type not found for product: ${productName}`);
            throw new Error(`Membership type not found for product: ${productName}`);
        }
        membershipTypeToUse = membershipType[0].id;
        console.log(`✅ Found membership type by name: ${membershipTypeToUse}`);
    }

    console.log("💰 Creating invoice...");
    // Create invoice
    const [invoice] = await db
        .insert(invoices)
        .values({
            profileId,
            type: "membership",
            description: `Payment for ${productName}`,
            status: "paid",
            paymentMethod: "Stripe",
            price: (expandedSession.amount_total || 0) / 100, // cents to dollars
        })
        .returning();
    console.log(`✅ Invoice created: ${invoice.id}`);

    console.log("👤 Creating membership...");
    // Create membership
    await db.insert(memberships).values({
        profileId,
        invoiceId: invoice.id,
        membershipTypeId: membershipTypeToUse,
        status: "approved", // Set to approved since payment is completed
    });

    console.log(
        `🎉 Successfully created membership for profile ${profileId} with type ${membershipTypeToUse}`,
    );
}
