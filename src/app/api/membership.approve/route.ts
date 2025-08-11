import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { memberships, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

import { sendApprovalEmail } from "@/services/email/membership-approved-email";
import createMembershipInvoice from "@/services/membership/createMembershipInvoice";

import { ZMembershipApproveRouteRequest } from "./type";

/**
 * @description Get all membership of a specific user via userId
 * @example Request body example:
 * {
 *   "userId": "4wmO9ldIBDx4xadtEunZtfkhuaxTgVyH"
 * }
 */
export const POST = staffRouteWrapper(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipApproveRouteRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    const { membershipId, paidDate, paymentMethod } = data;

    try {
        const result = await db
            .update(memberships)
            .set({ status: "approved" })
            .where(eq(memberships.id, membershipId))
            .returning();

        if (result.length < 1) {
            return response("bad_request", {
                message:
                    "Error Approving Membership - MembershipID does not map to a exisiting Membership",
            });
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
                and(eq(memberships.id, membershipId), eq(profiles.id, memberships.profileId)),
            );

        if (data.length < 1) {
            return response("bad_request", {
                message: "Error Approving Membership - Membership does not map to a profile",
            });
        }

        const invoice = await createMembershipInvoice({
            membershipID: membershipId,
            paidDate: paidDate,
            payment_method: paymentMethod,
        });

        const profileData = data[0];
        await sendApprovalEmail({
            to: profileData.email,
            subject: "UOA Esports Club Membership Approved",
            name: profileData.name,
            invoiceID: invoice.id,
        });

        return response("ok", {
            message: "Membership Approved Succesfully",
        });
    } catch (error) {
        console.error("Error Approving Membership:", error);
        return response("internal_server_error", {
            message: "Something went wrong when approving membership",
        });
    }
});
