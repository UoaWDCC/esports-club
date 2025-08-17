import { stripe } from "../client";

/**
 * Update a Stripe product.
 * @param productId Stripe product ID
 * @param name New product name
 * @param description New product description
 * @returns Updated Stripe product
 */
export async function updateStripeProduct(productId: string, name: string, description?: string) {
    const product = await stripe.products.update(productId, {
        name,
        description: description || `${name} membership`,
        active: true,
    });
    return product;
}
