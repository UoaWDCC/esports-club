import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema/membership_types";

import { ZMembershipTypeAddRequest } from "./type";

/**
 * @description Add a new membership type
 * @example Request body example:
 * {
 *   "name": "Premium Membership",
 *   "description": "Access to all premium features",
 *   "startAt": "2024-01-01T00:00:00Z",
 *   "endAt": "2024-12-31T23:59:59Z",
 *   "price": 5000,
 *   "isActive": true
 * }
 */
export const POST = staffRouteWrapper(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipTypeAddRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    try {
        const newMembershipType = await db
            .insert(membershipTypes)
            .values({
                name: data.name,
                description: data.description,
                startAt: data.startAt, // Already a Date object from schema transformation
                endAt: data.endAt, // Already a Date object from schema transformation
                price: data.price,
                isActive: data.isActive,
            })
            .returning();

        return response("created", {
            message: "Membership type created successfully",
            data: newMembershipType[0],
        });
    } catch (error) {
        return response("internal_server_error", {
            message: "Failed to create membership type",
            error: { name: "DatabaseError" },
        });
    }
});
