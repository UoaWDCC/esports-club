import { stripe } from "../client";

/**
 * Deactivate a Stripe product.
 * @param productId Stripe product ID
 * @returns Updated Stripe product
 */
export async function deactivateStripeProduct(productId: string) {
    const product = await stripe.products.update(productId, {
        active: false,
    });
    return product;
}
