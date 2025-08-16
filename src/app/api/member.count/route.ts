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
    let result = await db
        .select({
            count: count(),
        })
        .from(memberships)
        .innerJoin(profiles, eq(memberships.profileId, profiles.id))
        .where(eq(memberships.status, "approved"))
        .groupBy(memberships.profileId, profiles.id);

    const rowCount = result[0].count;

    const data = {
        totalItems: rowCount,
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
