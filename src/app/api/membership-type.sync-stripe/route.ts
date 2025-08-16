import { revalidateTag } from "next/cache";
import { ApiResponse, serverResponse, toResponse } from "@libs/api/response";
import { routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema";
import { createStripePrice } from "@libs/stripe/prices/createStripePrice";
import { deactivateStripePrice } from "@libs/stripe/prices/deactivateStripePrice";
import { getStripePrices } from "@libs/stripe/prices/getStripePrices";
import { createStripeProduct } from "@libs/stripe/products/createStripeProduct";
import { deactivateStripeProduct } from "@libs/stripe/products/deactivateStripeProduct";
import { getStripeProducts } from "@libs/stripe/products/getStripeProducts";
import { eq } from "drizzle-orm";

interface SyncResult {
    created: number;
    updated: number;
    deleted: number;
    errors: string[];
}

async function syncMembershipTypesToStripe(): Promise<ApiResponse<SyncResult>> {
    try {
        const result: SyncResult = {
            created: 0,
            updated: 0,
            deleted: 0,
            errors: [],
        };

        // Get all membership types from database
        const allMembershipTypes = await db.query.membershipTypes.findMany();

        // Get all products and prices from Stripe
        const stripeProducts = await getStripeProducts();
        const stripePrices = await getStripePrices();

        // Create maps for easier lookup
        const stripeProductMap = new Map(stripeProducts.map((product) => [product.name, product]));

        const stripePriceMap = new Map(stripePrices.map((price) => [price.productId, price]));

        // Track which Stripe products/prices are still needed
        const neededProducts = new Set<string>();
        const neededPrices = new Set<string>();

        // Process each membership type
        for (const membershipType of allMembershipTypes) {
            try {
                let stripeProductId = membershipType.stripeProductId;
                let stripePriceId = membershipType.stripePriceId;

                // Check if product exists and is correct
                const existingProduct = stripeProductMap.get(membershipType.name);

                if (!stripeProductId || !existingProduct) {
                    // Create new product
                    const newProduct = await createStripeProduct(
                        membershipType.name,
                        membershipType.description || undefined,
                    );
                    stripeProductId = newProduct.id;
                    result.created++;
                } else if (existingProduct) {
                    // Use existing product
                    stripeProductId = existingProduct.id;
                    // Note: Updates would require checking description changes
                }

                neededProducts.add(stripeProductId);

                // Handle price
                const existingPrice = stripePriceMap.get(stripeProductId);
                const priceInCents = membershipType.price;

                if (!stripePriceId || !existingPrice || existingPrice.unitAmount !== priceInCents) {
                    // Deactivate old price if it exists and is different
                    if (
                        stripePriceId &&
                        existingPrice &&
                        existingPrice.unitAmount !== priceInCents
                    ) {
                        await deactivateStripePrice(stripePriceId);
                    }

                    // Create new price
                    const newPrice = await createStripePrice(stripeProductId, priceInCents);
                    stripePriceId = newPrice.id;
                    result.created++;
                } else if (existingPrice) {
                    stripePriceId = existingPrice.id;
                }

                neededPrices.add(stripePriceId);

                // Update membership type with Stripe IDs
                await db
                    .update(membershipTypes)
                    .set({
                        stripeProductId,
                        stripePriceId,
                        updateAt: new Date(),
                    })
                    .where(eq(membershipTypes.id, membershipType.id));
            } catch (error) {
                result.errors.push(
                    `Error processing ${membershipType.name}: ${error instanceof Error ? error.message : String(error)}`,
                );
            }
        }

        // Deactivate orphaned prices first
        for (const price of stripePrices) {
            if (!neededPrices.has(price.id)) {
                try {
                    await deactivateStripePrice(price.id);
                    result.deleted++;
                } catch (error) {
                    result.errors.push(
                        `Failed to deactivate orphaned price ${price.id}: ${error instanceof Error ? error.message : String(error)}`,
                    );
                }
            }
        }

        // Deactivate orphaned products
        for (const product of stripeProducts) {
            if (!neededProducts.has(product.id)) {
                try {
                    await deactivateStripeProduct(product.id);
                    result.deleted++;
                } catch (error) {
                    result.errors.push(
                        `Failed to deactivate orphaned product ${product.name}: ${error instanceof Error ? error.message : String(error)}`,
                    );
                }
            }
        }

        // Revalidate cache
        revalidateTag("membershipTypes");

        return serverResponse("ok", { data: result });
    } catch {
        return serverResponse("internal_server_error", {
            message: "Failed to sync membership types to Stripe",
        });
    }
}

export const POST = routeWrapper(async () => {
    return toResponse(await syncMembershipTypesToStripe());
});
