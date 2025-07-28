// app/components/actions.js
"use server";

import { db } from "@libs/db";
import { memberships } from "@schema";
import { eq } from "drizzle-orm";

export async function resetTestMembership() {
    try {
        const result = await db
            .update(memberships)
            .set({ status: "pending", notes: "" })
            .where(eq(memberships.id, "ad5c0a8b-791f-4880-b864-badc3834e087"))
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
