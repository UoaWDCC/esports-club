"use server";

import { Response, response } from "@libs/api/response";
import { db } from "@libs/db";
import { MembershipTypeDTO, ZMembershipTypeDTO } from "@libs/types/membershipType.type";

// return all currently active memberships
export const getActiveMemberships = async (
    userId: string,
): Promise<Response<MembershipTypeDTO[]>> => {
    // find profile
    const profile = await db.query.profiles.findFirst({
        columns: { id: true },
        where: (profiles, { eq }) => eq(profiles.userId, userId),
    });

    // unauthorized
    if (!profile) {
        return response("unauthorized", { message: "You do not have a profile" });
    }

    // find memberships
    const memberships = await db.query.memberships.findMany({
        // columns: { membershipTypeId: true },
        where: (ms, { eq, and }) => and(eq(ms.status, "approved"), eq(ms.profileId, profile.id)),
    });

    // normalize
    const membershipTypeIds = memberships.map((m) => m.membershipTypeId);

    const types = await db.query.membershipTypes.findMany({
        where: (mt, { inArray }) => inArray(mt.id, membershipTypeIds),
    });

    if (types.length < 1) {
        return response("ok", {
            data: [],
            message: "No membership found",
        });
    }

    const { data: dtoTypes, success, error } = ZMembershipTypeDTO.array().safeParse(types);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed, this should not happen",
            error: error?.issues,
        });
    }

    const validMembershipTypes: MembershipTypeDTO[] = [];
    for (const type of dtoTypes) {
        const now = new Date();
        const startAt = new Date(type.startAt);
        const endAt = new Date(type.endAt);

        const valid = now >= startAt && now <= endAt;
        if (valid) {
            validMembershipTypes.push(type);
        }
    }

    return response("ok", { data: validMembershipTypes });
};
