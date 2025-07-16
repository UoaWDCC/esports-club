"use server";

import { db } from "@libs/db";
import { memberships, membershipTypes } from "@libs/db/schema";
import { eq } from "drizzle-orm";

export const getAllExpiredMemberships = async () => {
    const now = new Date();

    const expiredMemberships = await db
        .select({
            membership: memberships,
            membershipType: membershipTypes,
        })
        .from(memberships)
        .innerJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id))
        .where(eq(memberships.isPaid, true));

    return expiredMemberships.filter(({ membershipType }) => {
        const end = new Date(membershipType.endAt);
        return now > end;
    });
};
