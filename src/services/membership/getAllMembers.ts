"use server";

import { db } from "@libs/db";
import { memberships, profiles } from "@libs/db/schema";
import { eq } from "drizzle-orm";

export const getAllMembers = async (limit: number = Infinity, page: number = 1) => {
    if (!limit || !page) {
        throw new Error("Invalid limit or page");
    }

    if (limit < 1 || page < 1) {
        throw new Error("Invalid limit or page");
    }

    const members = await db
        .select({
            profileId: memberships.profileId,
            profile: profiles,
        })
        .from(memberships)
        .innerJoin(profiles, eq(memberships.profileId, profiles.id))
        .where(eq(memberships.status, "approved"))
        .offset(limit * (page - 1))
        .limit(limit);

    // Remove duplicates in case of multiple memberships per profile
    const uniqueMembers = Array.from(
        new Map(members.map((m) => [m.profile.id, m.profile])).values(),
    );

    return uniqueMembers;
};
