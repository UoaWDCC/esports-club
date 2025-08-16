import { revalidateTag } from "next/cache";
import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema/membership_types";
import { deactivateStripePrice } from "@libs/stripe/prices/deactivateStripePrice";
import { deactivateStripeProduct } from "@libs/stripe/products/deactivateStripeProduct";
import { eq } from "drizzle-orm";

import { ZMembershipTypeDeleteRequest } from "./type";

/**
 * @description Delete a membership type
 * @example Request body example:
 * {
 *   "id": "membership-type-id"
 * }
 */
export const DELETE = staffRouteWrapper(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipTypeDeleteRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    try {
        const membershipTypeToDelete = await db.query.membershipTypes.findFirst({
            where: eq(membershipTypes.id, data.id),
        });

        if (!membershipTypeToDelete) {
            return response("not_found", {
                message: "Membership type not found",
            });
        }

        // Deactivate Stripe product and price if they exist
        if (membershipTypeToDelete.stripeProductId) {
            await deactivateStripeProduct(membershipTypeToDelete.stripeProductId);
        }
        if (membershipTypeToDelete.stripePriceId) {
            await deactivateStripePrice(membershipTypeToDelete.stripePriceId);
        }

        const deletedMembershipType = await db
            .delete(membershipTypes)
            .where(eq(membershipTypes.id, data.id))
            .returning();

        if (deletedMembershipType.length === 0) {
            return response("not_found", {
                message: "Membership type not found",
            });
        }

        revalidateTag("membershipTypes");

        return response("ok", {
            message: "Membership type deleted successfully",
            data: deletedMembershipType[0],
        });
    } catch (error) {
        console.error("Failed to delete membership type with Stripe integration:", error);
        return response("internal_server_error", {
            message: "Failed to delete membership type",
            error: {
                name: "DatabaseError",
                details: error instanceof Error ? error.message : "Unknown error",
            },
        });
    }
});
