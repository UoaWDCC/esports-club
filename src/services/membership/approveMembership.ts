// app/components/actions.js
"use server";

import { db } from "@libs/db";
import { PaymentMethod } from "@libs/types/invoice.type";
import { memberships, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

import { sendApprovalEmail } from "../email/membership-approved-email";
import createMembershipInvoice from "./createMembershipInvoice";

export type approveMembershipType = {
    membershipID: string;
    paidDate?: Date;
    payment_method?: PaymentMethod;
};
export async function approveMembership({
    membershipID,
    paidDate = new Date(),
    payment_method = "Stripe",
}: approveMembershipType) {
    try {
        const result = await db
            .update(memberships)
            .set({ status: "approved" })
            .where(eq(memberships.id, membershipID))
            .returning();

        if (result.length < 1) {
            console.error("Error Approving Membership - MembershipID does not map to a Membership");
            return false;
        }

        const data = await db
            .select({
                profileID: profiles.id,
                name: profiles.firstName,
                email: profiles.email,
            })
            .from(profiles)
            .innerJoin(
                memberships,
                and(eq(memberships.id, membershipID), eq(profiles.id, memberships.profileId)),
            );

        if (data.length < 1) {
            console.error("Error Approving Membership - Membership does not map to a profile");
            return false;
        }

        const invoice = await createMembershipInvoice({
            membershipID: membershipID,
            paidDate: paidDate,
            payment_method: payment_method,
        });

        const profileData = data[0];
        await sendApprovalEmail({
            to: profileData.email,
            subject: "UOA Esports Club Membership Approved",
            name: profileData.name,
            invoiceID: invoice.id,
        });
        return result;
    } catch (error) {
        console.error("Error Approving Membership:", error);
        return error;
    }
}
