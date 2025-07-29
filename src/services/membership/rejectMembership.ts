// app/components/actions.js
"use server";

import { db } from "@libs/db";
import { memberships, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

import { sendRejectionEmail } from "../email/membership-rejection-email";

export async function rejectMembership(membershipID: string, reason: string) {
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
        const data = await db
            .select({
                name: profiles.firstName,
                email: profiles.email,
            })
            .from(profiles)
            .innerJoin(
                memberships,
                and(eq(memberships.id, membershipID), eq(profiles.id, memberships.profileId)),
            );
        const profileData = data[0];
        await sendRejectionEmail({
            to: profileData.email,
            subject: "UOA Esports Club Membership Not Approved",
            name: profileData.name,
            reason: reason,
        });
        return result;
    } catch (error) {
        console.error("Error Approving Membership:", error);
        return error;
    }
}
