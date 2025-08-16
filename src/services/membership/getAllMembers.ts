"use server";

import { db } from "@libs/db";
import { memberships, profiles } from "@libs/db/schema";
import { eq } from "drizzle-orm";

export const getAllMembers = async (
    body: { limit?: number; page: number } = { limit: 50, page: 1 },
) => {
    const { page, limit } = body;

    if (page < 1) {
        throw new Error("Invalid page");
    }

    let query = db
        .select({
            profileId: memberships.profileId,
            profile: profiles,
        })
        .from(memberships)
        .innerJoin(profiles, eq(memberships.profileId, profiles.id))
        .where(eq(memberships.status, "approved"))
        .groupBy(memberships.profileId, profiles.id);

    let memberQuery = query;

    // paginate
    if (limit && limit > 0) {
        memberQuery.offset(limit * (page - 1)).limit(limit);
    }

    const [members, counting] = await Promise.all([memberQuery, query]);

    // Remove duplicates in case of multiple memberships per profile
    const uniqueMembers = Array.from(
        new Map(members.map((m) => [m.profile.id, m.profile])).values(),
    );

    return { members: uniqueMembers, count: counting.length };
};
