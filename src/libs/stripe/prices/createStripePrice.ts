import { stripe } from "../client";

/**
 * Create a Stripe price for a product.
 * @param productId Stripe product ID
 * @param unitAmount Price in cents
 * @param currency Currency code (default: "nzd")
 * @returns Stripe price
 */
export async function createStripePrice(
    productId: string,
    unitAmount: number,
    currency: string = "nzd",
) {
    const price = await stripe.prices.create({
        product: productId,
        unit_amount: unitAmount,
        currency: currency.toLowerCase(),
        billing_scheme: "per_unit",
        metadata: {
            type: "membership",
        },
    });
    return price;
}
