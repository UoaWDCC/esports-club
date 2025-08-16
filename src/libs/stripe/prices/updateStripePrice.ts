import { stripe } from "../client";
import { createStripePrice } from "./createStripePrice";

/**
 * Update a Stripe price by creating a new one and deactivating the old one.
 * @param oldPriceId Old Stripe price ID to deactivate
 * @param productId Stripe product ID
 * @param unitAmount New price in cents
 * @param currency Currency code (default: "nzd")
 * @returns New Stripe price
 */
export async function updateStripePrice(
    oldPriceId: string,
    productId: string,
    unitAmount: number,
    currency: string = "nzd",
) {
    // Create new price
    const newPrice = await createStripePrice(productId, unitAmount, currency);

    // Deactivate old price
    await stripe.prices.update(oldPriceId, {
        active: false,
    });

    return newPrice;
}
