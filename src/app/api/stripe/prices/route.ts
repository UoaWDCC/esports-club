// Stripe prices API route
import { NextResponse } from "next/server";
import { getStripePrices } from "@libs/stripe/prices/getStripePrices";
import { getStripeProducts } from "@libs/stripe/products/getStripeProducts";

export async function GET() {
    try {
        const [prices, products] = await Promise.all([getStripePrices(), getStripeProducts()]);
        return NextResponse.json({ prices, products });
    } catch (error) {
        console.error("Error fetching Stripe data:", error);
        return NextResponse.json({ error: "Failed to fetch pricing data" }, { status: 500 });
    }
}
