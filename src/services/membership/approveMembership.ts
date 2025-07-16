// app/components/actions.js
"use server";

import { db } from "@libs/db";
import { memberships } from "@schema";
import { eq } from "drizzle-orm";

export async function approveMembership(membershipID: string) {
    try {
        const result = await db
            .update(memberships)
            .set({ isPaid: true })
            .where(eq(memberships.id, membershipID))
            .returning();
        if (result.length < 1) {
            console.error("Error Approving Membership - MembershipID does not map to a Membership");
            return false;
        }
        return result;
    } catch (error) {
        console.error("Error Approving Membership:", error);
        return error;
    }
}
