import { stripe } from "../client";

/**
 * Create a Stripe product for a membership type.
 * @param name Product name
 * @param description Product description
 * @returns Stripe product
 */
export async function createStripeProduct(name: string, description?: string) {
    const product = await stripe.products.create({
        name,
        description: description || `${name} membership`,
        active: true,
        metadata: {
            type: "membership",
        },
    });
    return product;
}
