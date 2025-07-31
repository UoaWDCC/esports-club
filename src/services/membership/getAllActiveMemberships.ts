"use server";

import { db } from "@libs/db";
import { memberships, membershipTypes } from "@libs/db/schema";
import { eq } from "drizzle-orm";

export const getAllActiveMemberships = async () => {
    const now = new Date();

    const activeMemberships = await db
        .select({
            membership: memberships,
            membershipType: membershipTypes,
        })
        .from(memberships)
        .innerJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id))
        .where(eq(memberships.status, "approved"));

    return activeMemberships.filter(({ membershipType }) => {
        const start = new Date(membershipType.startAt);
        const end = new Date(membershipType.endAt);
        return now >= start && now <= end;
    });
};
