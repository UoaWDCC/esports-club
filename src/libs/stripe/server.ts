/**
 * Stripe Server-Side Configuration and Utilities
 *
 * This module provides server-side Stripe functionality for the esports club membership system.
 * It handles checkout sessions, customer portal access, and product/price management.
 *
 * Key Features:
 * - Create checkout sessions for membership purchases
 * - Manage customer portal sessions for subscription management
 * - Fetch Stripe products and prices for dynamic pricing display
 * - Handle one-time payments for semester-based memberships
 */

import { env } from "@libs/env";
import Stripe from "stripe";

/**
 * Stripe client instance configured with server-side secret key
 * Used for all server-side Stripe operations like creating checkout sessions
 * and managing customer data
 */
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
});

/**
 * Creates a Stripe checkout session for membership purchases
 *
 * This function sets up a one-time payment session for semester-based memberships.
 * It includes metadata for tracking the purchase and allows promotion codes.
 *
 * @param profileId - The user's profile ID for tracking the purchase
 * @param priceId - The Stripe price ID for the selected membership plan
 * @param successUrl - URL to redirect to after successful payment
 * @param cancelUrl - URL to redirect to if payment is cancelled
 * @returns Stripe checkout session object
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
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "payment", // One-time payment for semester plans
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: profileId, // Used to identify the user in webhooks
        allow_promotion_codes: true,
        metadata: {
            profileId,
            type: "semester_membership",
        },
    });

    return session;
}

/**
 * Creates a Stripe customer portal session for subscription management
 *
 * Allows users to manage their billing information, view invoices,
 * and update payment methods through Stripe's hosted portal.
 *
 * @param customerId - The Stripe customer ID
 * @param returnUrl - URL to return to after leaving the portal
 * @returns Stripe customer portal session object
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    return session;
}

/**
 * Fetches all active Stripe prices with expanded product information
 *
 * This function retrieves all one-time payment prices from Stripe and formats them
 * for use in the pricing page. It includes product details for display purposes.
 *
 * Used by the pricing page to dynamically display membership options and prices
 * without hardcoding price IDs in the application.
 *
 * @returns Array of formatted price objects with product information
 */
export async function getStripePrices() {
    const prices = await stripe.prices.list({
        expand: ["data.product"], // Include full product details
        active: true,
        type: "one_time", // Only one-time payments for semester memberships
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
 * Fetches all active Stripe products
 *
 * Retrieves product information for display purposes. Used to get product names
 * and descriptions for the membership plans.
 *
 * @returns Array of Stripe product objects
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
