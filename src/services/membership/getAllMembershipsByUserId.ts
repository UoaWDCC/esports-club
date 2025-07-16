"use server";

import { db } from "@libs/db";
import { memberships, profiles } from "@libs/db/schema";
import { eq } from "drizzle-orm";

export const getAllMembershipsByUserId = async (userId: string) => {
    const profile = await db
        .select({ id: profiles.id })
        .from(profiles)
        .where(eq(profiles.userId, userId));

    if (!profile[0]) return [];

    const membershipsList = await db
        .select()
        .from(memberships)
        .where(eq(memberships.profileId, profile[0].id));

    return membershipsList;
};
