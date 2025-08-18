"use server";

import { db } from "@libs/db";
import { memberships, profiles } from "@libs/db/schema";
import { asc, desc, eq } from "drizzle-orm";

import { MemberOrdering } from "@/app/api/member.all/type";

export const getAllMembers = async (
    body: { limit: number; page: number; ordering: MemberOrdering } = {
        limit: 50,
        page: 1,
        ordering: {
            column: "firstName",
            descending: true,
        } as MemberOrdering,
    },
) => {
    const { page, limit, ordering } = body;
    console.log(ordering);
    if (page < 1) {
        throw new Error("Invalid page");
    }
    const column = profiles[ordering.column] ?? profiles.firstName;
    const query = db
        .select({
            profileId: memberships.profileId,
            profile: profiles,
        })
        .from(memberships)
        .innerJoin(profiles, eq(memberships.profileId, profiles.id))
        .where(eq(memberships.status, "approved"))
        .groupBy(memberships.profileId, profiles.id)
        .orderBy(ordering.descending ? desc(column) : asc(column));

    const memberQuery = query;

    // paginate
    if (limit && limit > 0) {
        memberQuery.offset(limit * (page - 1)).limit(limit);
    }

    const [members, counting] = await Promise.all([memberQuery, query]);

    // Remove duplicates in case of multiple memberships per profile
    const uniqueMembers = Array.from(
        new Map(members.map((m) => [m.profileId, m.profile])).values(),
    );

    return { members: uniqueMembers, count: counting.length };
};
