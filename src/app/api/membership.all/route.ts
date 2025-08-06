import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { memberships, membershipTypes } from "@schema";
import { eq } from "drizzle-orm";

import {
    MembershipAllRouteResponse,
    ZMembershipAllRouteRequest,
    ZMembershipAllRouteResponse,
} from "./type";

/**
 * @description Get all membership with status label, can be filtered by passing "status"
 * @example Request body example:
 * {
 *   "status": "active"  // or "expired" or empty
 * }
 */
export const POST = staffRouteWrapper<MembershipAllRouteResponse[]>(async (req) => {
    const body = await req.json();

    const bodyReq = ZMembershipAllRouteRequest.safeParse(body);

    if (!bodyReq.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: bodyReq.error.issues,
        });
    }

    const { status } = bodyReq.data;

    // get all active memberships
    const allMemberships = await db
        .select({
            membership: memberships,
            membershipType: membershipTypes,
        })
        .from(memberships)
        .innerJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id))
        .where(eq(memberships.status, "approved"));

    // check if membership is active or expired
    const now = new Date();
    const membershipsWithStatus = allMemberships.map((m) => {
        const { startAt, endAt } = m.membershipType;

        if (startAt <= now && now <= endAt)
            return { ...m.membership, startAt, endAt, status: "active" };
        else return { ...m.membership, startAt, endAt, status: "expired" };
    });

    let filteredMemberships = membershipsWithStatus || [];
    if (status) {
        filteredMemberships = filteredMemberships.filter((m) => m.status === status) || [];
    }

    const parsedMemberships = ZMembershipAllRouteResponse.array().safeParse(filteredMemberships);

    if (!parsedMemberships.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: parsedMemberships.error.issues,
        });
    }

    return response("ok", { data: parsedMemberships.data });
});
