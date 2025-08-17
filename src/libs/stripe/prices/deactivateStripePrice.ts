import { stripe } from "../client";

/**
 * Deactivate a Stripe price.
 * @param priceId Stripe price ID
 * @returns Updated Stripe price
 */
export async function deactivateStripePrice(priceId: string) {
    const price = await stripe.prices.update(priceId, {
        active: false,
    });
    return price;
}
