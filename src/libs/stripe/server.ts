import { env } from "@libs/env";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
});

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
        client_reference_id: profileId,
        allow_promotion_codes: true,
        metadata: {
            profileId,
            type: "semester_membership",
        },
    });

    return session;
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    return session;
}

export async function getStripePrices() {
    const prices = await stripe.prices.list({
        expand: ["data.product"],
        active: true,
        type: "one_time",
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
