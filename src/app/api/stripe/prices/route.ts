import { NextResponse } from "next/server";
import { getStripePrices, getStripeProducts } from "@libs/stripe/server";

export async function GET() {
    try {
        const [prices, products] = await Promise.all([getStripePrices(), getStripeProducts()]);

        return NextResponse.json({ prices, products });
    } catch (error) {
        console.error("Error fetching Stripe data:", error);
        return NextResponse.json({ error: "Failed to fetch pricing data" }, { status: 500 });
    }
}
