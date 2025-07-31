"use server";

import { db } from "@libs/db";
import { memberships, profiles } from "@libs/db/schema";
import { eq } from "drizzle-orm";

export const getAllMembers = async () => {
    const members = await db
        .select({
            profileId: memberships.profileId,
            profile: profiles,
        })
        .from(memberships)
        .innerJoin(profiles, eq(memberships.profileId, profiles.id))
        .where(eq(memberships.status, "approved"));

    // Remove duplicates in case of multiple memberships per profile
    const uniqueMembers = Array.from(
        new Map(members.map((m) => [m.profile.id, m.profile])).values(),
    );

    return uniqueMembers;
};
