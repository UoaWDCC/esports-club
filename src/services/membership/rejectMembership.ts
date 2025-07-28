// app/components/actions.js
"use server";

import { db } from "@libs/db";
import { memberships } from "@schema";
import { eq } from "drizzle-orm";

import { sendRejectionEmail } from "../email/membership-rejection-email";

export async function rejectMembership(
    name: string,
    email: string,
    membershipID: string,
    reason: string,
) {
    try {
        const result = await db
            .update(memberships)
            .set({ status: "rejected", notes: reason })
            .where(eq(memberships.id, membershipID))
            .returning();
        if (result.length < 1) {
            console.error("Error Rejecting Membership - MembershipID does not map to a Membership");
            return false;
        }

        await sendRejectionEmail({
            to: email,
            subject: "UOA Esports Club Membership Not Approved",
            name: name,
            reason: reason,
        });
        return result;
    } catch (error) {
        console.error("Error Approving Membership:", error);
        return error;
    }
}
