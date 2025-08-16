import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema/membership_types";
import { eq } from "drizzle-orm";

import { ZMembershipTypeEditRequest } from "./type";

/**
 * @description Edit an existing membership type
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

    const { data, success, error } = ZMembershipTypeEditRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    try {
        const { id, ...updateData } = data;

        const updatedMembershipType = await db
            .update(membershipTypes)
            .set({
                name: updateData.name,
                description: updateData.description,
                startAt: updateData.startAt, // Already a Date object from schema transformation
                endAt: updateData.endAt, // Already a Date object from schema transformation
                price: updateData.price,
                isActive: updateData.isActive,
                updateAt: new Date(),
            })
            .where(eq(membershipTypes.id, id))
            .returning();

        if (updatedMembershipType.length === 0) {
            return response("not_found", {
                message: "Membership type not found",
            });
        }

        return response("ok", {
            message: "Membership type updated successfully",
            data: updatedMembershipType[0],
        });
    } catch (error) {
        return response("internal_server_error", {
            message: "Failed to update membership type",
            error: { name: "DatabaseError" },
        });
    }
});
