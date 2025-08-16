// app/api/members/route.ts
import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { memberships, profiles } from "@schema";
import { count, eq } from "drizzle-orm";

import { MemberCount, ZMemberCountResponse } from "./type";

/**
 * @description Get all profile with active membership
 */
export const GET = staffRouteWrapper<MemberCount>(async () => {
    // Count distinct profiles that have approved memberships
    const result = await db
        .select({
            count: count(profiles.id),
        })
        .from(memberships)
        .innerJoin(profiles, eq(memberships.profileId, profiles.id))
        .where(eq(memberships.status, "approved"));

    const totalMembers = result[0]?.count || 0;

    const data = {
        totalItems: totalMembers,
    };

    const parsedCount = ZMemberCountResponse.safeParse(data);

    if (!parsedCount.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: parsedCount.error?.issues,
        });
    }

    return response("ok", { data: parsedCount.data });
});
