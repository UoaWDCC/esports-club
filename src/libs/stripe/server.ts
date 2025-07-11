// Stripe server-side utilities for membership checkout and pricing
import { env } from "@libs/env";
import Stripe from "stripe";

// Stripe client instance for server-side operations
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
});

/**
 * Create a Stripe checkout session for a membership purchase.
 * @param profileId User's profile ID
 * @param priceId Stripe price ID
 * @param successUrl Redirect after payment
 * @param cancelUrl Redirect if cancelled
 * @returns Stripe checkout session
 */
export async function createCheckoutSession({
    profileId,
    priceId,
    successUrl,
    cancelUrl,
}: {
    profileId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}) {
    // One-time payment for semester plans
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "payment", // one-time
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: profileId, // for webhooks
        allow_promotion_codes: true,
        metadata: {
            profileId,
            type: "semester_membership",
        },
    });
    return session;
}

/**
 * Create a Stripe customer portal session.
 * @param customerId Stripe customer ID
 * @param returnUrl Redirect after portal
 * @returns Stripe portal session
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
    return session;
}

/**
 * Get all active Stripe prices with product info.
 * @returns Array of price objects
 */
export async function getStripePrices() {
    const prices = await stripe.prices.list({
        expand: ["data.product"], // include product details
        active: true,
        type: "one_time", // only one-time payments
    });
    return prices.data.map((price: Stripe.Price) => {
        const product = price.product as Stripe.Product;
        return {
            id: price.id,
            productId: typeof price.product === "string" ? price.product : price.product.id,
            unitAmount: price.unit_amount,
            currency: price.currency,
            productName: typeof price.product === "string" ? "" : product.name,
            productDescription: typeof price.product === "string" ? "" : product.description,
        };
    });
}

/**
 * Get all active Stripe products.
 * @returns Array of product objects
 */
export async function getStripeProducts() {
    const products = await stripe.products.list({
        active: true,
    });
    return products.data.map((product: Stripe.Product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
    }));
}
