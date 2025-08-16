import { revalidateTag } from "next/cache";
import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema/membership_types";
import { createStripePrice } from "@libs/stripe/prices/createStripePrice";
import { updateStripePrice } from "@libs/stripe/prices/updateStripePrice";
import { createStripeProduct } from "@libs/stripe/products/createStripeProduct";
import { updateStripeProduct } from "@libs/stripe/products/updateStripeProduct";
import { eq } from "drizzle-orm";

import { ZMembershipTypeUpdateRequest } from "./type";

/**
 * @description Update an existing membership type
 * @example Request body example:
 * {
 *   "id": "membership-type-id",
 *   "name": "Updated Premium Membership",
 *   "description": "Updated description",
 *   "startAt": "2024-01-01T00:00:00Z",
 *   "endAt": "2024-12-31T23:59:59Z",
 *   "price": 6000,
 *   "isActive": true
 * }
 */
export const PUT = staffRouteWrapper(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipTypeUpdateRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    try {
        const { id, ...updateData } = data;

        // First, get the current membership type to access Stripe IDs
        const currentMembershipType = await db.query.membershipTypes.findFirst({
            where: eq(membershipTypes.id, id),
        });

        if (!currentMembershipType) {
            return response("not_found", {
                message: "Membership type not found",
            });
        }

        let stripeProductId = currentMembershipType.stripeProductId;
        let stripePriceId = currentMembershipType.stripePriceId;

        // Update or create Stripe product and price
        if (stripeProductId) {
            // Update existing Stripe product
            await updateStripeProduct(stripeProductId, updateData.name, updateData.description);

            // Update Stripe price (this creates a new price and deactivates the old one)
            if (stripePriceId && currentMembershipType.price !== updateData.price) {
                const newStripePrice = await updateStripePrice(
                    stripePriceId,
                    stripeProductId,
                    updateData.price,
                    "nzd",
                );
                stripePriceId = newStripePrice.id;
            }
        } else {
            // Create new Stripe product and price if they don't exist
            const stripeProduct = await createStripeProduct(
                updateData.name,
                updateData.description,
            );
            const stripePrice = await createStripePrice(stripeProduct.id, updateData.price, "nzd");
            stripeProductId = stripeProduct.id;
            stripePriceId = stripePrice.id;
        }

        const updatedMembershipType = await db
            .update(membershipTypes)
            .set({
                name: updateData.name,
                description: updateData.description,
                startAt: updateData.startAt, // Already a Date object from schema transformation
                endAt: updateData.endAt, // Already a Date object from schema transformation
                price: updateData.price,
                isActive: updateData.isActive,
                stripeProductId,
                stripePriceId,
                updateAt: new Date(),
            })
            .where(eq(membershipTypes.id, id))
            .returning();

        if (updatedMembershipType.length === 0) {
            return response("not_found", {
                message: "Membership type not found",
            });
        }

        // Invalidate the server-side cache for membership types
        revalidateTag("membershipTypes");

        return response("ok", {
            message: "Membership type updated successfully",
            data: updatedMembershipType[0],
        });
    } catch (error) {
        console.error("Failed to update membership type with Stripe integration:", error);
        return response("internal_server_error", {
            message: "Failed to update membership type",
            error: {
                name: "DatabaseError",
                details: error instanceof Error ? error.message : "Unknown error",
            },
        });
    }
});
