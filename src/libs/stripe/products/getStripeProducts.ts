import Stripe from "stripe";

import { stripe } from "../client";

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
