import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { memberships, membershipTypes, profiles } from "@schema";
import { eq } from "drizzle-orm";

import { MembershipAll, ZMembershipAllRouteRequest, ZMembershipAllRouteResponse } from "./type";

/**
 * @description Get all membership with status label, can be filtered by passing "status"
 * @example Request body example:
 * {
 *   "status": "active"  // or "expired" or empty
 * }
 */
export const POST = staffRouteWrapper<MembershipAll>(async (req) => {
    const body = await req.json();

    const bodyReq = ZMembershipAllRouteRequest.safeParse(body);

    // default if invalid params
    const { state, status } = bodyReq.success
        ? bodyReq.data
        : { state: undefined, status: undefined };

    // get all active memberships
    const allMemberships = await db
        .select({
            membership: memberships,
            profile: profiles,
            membershipType: membershipTypes,
        })
        .from(memberships)
        .innerJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id))
        .innerJoin(profiles, eq(profiles.id, memberships.profileId))
        .where(eq(memberships.status, status || "approved"));

    // check if membership is active or expired
    const now = new Date();
    const membershipsWithStatus = allMemberships.map((m) => {
        const { startAt, endAt, name, price } = m.membershipType;
        const { firstName, lastName, email } = m.profile;

        if (startAt <= now && now <= endAt)
            return {
                ...m.membership,
                startAt,
                endAt,
                state: "active",
                firstName,
                lastName,
                email,
                type: name,
                price,
            };
        else
            return {
                ...m.membership,
                startAt,
                endAt,
                state: "expired",
                firstName,
                lastName,
                email,
                type: name,
                price,
            };
    });

    let filteredMemberships = membershipsWithStatus || [];
    if (state) {
        filteredMemberships = filteredMemberships.filter((m) => m.state === state) || [];
    }

    console.log(filteredMemberships);

    const parsedMemberships = ZMembershipAllRouteResponse.safeParse({
        memberships: filteredMemberships,
    });

    if (!parsedMemberships.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: parsedMemberships.error.issues,
        });
    }

    return response("ok", { data: parsedMemberships.data });
});
