import { isOk, response, ServerResponse, serverResponse, toResponse } from "@libs/api/response";
import { staffRouteWrapper, userRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { StatusOption } from "@libs/types/membership.type";
import { memberships, membershipTypes, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

import { MembershipListResponse, ZMembershipListRequest, ZMembershipListResponse } from "./type";

/**
 * @description Get all membership of the current logged in user
 */
export const GET = userRouteWrapper(async (_, session) => {
    const { id: userId } = session.user;

    return toResponse(await getAllMembershipsByUserId(userId));
});

/**
 * @description Get all membership of a specific user via userId
 * @example Request body example:
 * {
 *   "userId": "4wmO9ldIBDx4xadtEunZtfkhuaxTgVyH"
 * }
 */
export const POST = staffRouteWrapper<MembershipListResponse>(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipListRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    const { userId, state, status } = data;

    const memberships = await getAllMembershipsByUserId(userId, status);

    if (!isOk(memberships)) {
        return toResponse(memberships);
    }

    let filteredMemberships: MembershipListResponse["memberships"] =
        memberships.data?.memberships || [];

    if (state) {
        filteredMemberships = filteredMemberships.filter((m) => m.state === state) || [];
    }

    return response("ok", { data: { memberships: filteredMemberships } });
});

/**
 * @param userId
 * @returns all memberships
 */
const getAllMembershipsByUserId = async (
    userId: string,
    status?: StatusOption,
): Promise<ServerResponse<MembershipListResponse>> => {
    const profile = await db
        .select({ id: profiles.id })
        .from(profiles)
        .where(eq(profiles.userId, userId));

    if (!profile[0]) return serverResponse("bad_request", { message: "cannot find profile" });

    // get all approved memberships
    const membershipsList = await db
        .select({
            memberships: memberships,
            membershipType: {
                startAt: membershipTypes.startAt,
                endAt: membershipTypes.endAt,
                description: membershipTypes.description,
                price: membershipTypes.price,
                title: membershipTypes.name,
            },
        })
        .from(memberships)
        .where(
            and(
                eq(memberships.profileId, profile[0].id),
                status ? eq(memberships.status, status) : undefined,
            ),
        )
        .innerJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id));

    // check if membership is active or expired
    const now = new Date();
    const membershipsWithStatus = membershipsList.map((m) => {
        const { startAt, endAt, description } = m.membershipType;

        const isActive = startAt <= now && now <= endAt;

        return {
            ...m.memberships,
            ...m.membershipType,
            startAt,
            endAt,
            description,
            state: isActive ? "active" : "expired",
        };
    });

    const { data, success, error } = ZMembershipListResponse.safeParse({
        memberships: membershipsWithStatus || [],
    });

    if (!success) {
        return serverResponse("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    return serverResponse("ok", { data });
};
