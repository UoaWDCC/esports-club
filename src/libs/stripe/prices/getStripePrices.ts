import Stripe from "stripe";

import { stripe } from "../client";

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
