import { NextRequest, NextResponse } from "next/server";
import { db } from "@libs/db";
import { invoices, memberships, membershipTypes } from "@libs/db/schema";
import { stripe } from "@libs/stripe/server";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

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

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    // Retrieve the session with expanded line items to get price information
    const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
    });

    const profileId = expandedSession.client_reference_id;
    const priceId = expandedSession.line_items?.data[0]?.price?.id;

    if (!profileId || !priceId) {
        console.error("Session data:", {
            profileId,
            priceId,
            sessionId: session.id,
            clientReferenceId: session.client_reference_id,
        });
        throw new Error("Missing profileId or priceId in session");
    }

    // Get the price details to find the membership type
    const price = await stripe.prices.retrieve(priceId, {
        expand: ["product"],
    });

    const product = price.product as Stripe.Product;
    const productName = product.name;

    // Find the membership type based on the product name
    const membershipType = await db
        .select()
        .from(membershipTypes)
        .where(eq(membershipTypes.name, productName))
        .limit(1);

    if (membershipType.length === 0) {
        throw new Error(`Membership type not found for product: ${productName}`);
    }

    // Create invoice record
    const [invoice] = await db
        .insert(invoices)
        .values({
            profileId,
            type: "membership",
            description: `Payment for ${productName}`,
            status: "paid",
            paymentMethod: "Stripe",
            price: (expandedSession.amount_total || 0) / 100,
        })
        .returning();

    await db.insert(memberships).values({
        profileId,
        invoiceId: invoice.id,
        membershipTypeId: membershipType[0].id,
        isPaid: true,
    });

    console.log(`Successfully created membership for profile ${profileId}`);
}
