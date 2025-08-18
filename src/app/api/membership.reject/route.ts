import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { memberships, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

import { sendRejectionEmail } from "@/services/email/membership-rejection-email";

import { ZMembershipRejectRouteRequest } from "./type";

/**
 * @description Rejects a specific membership via membershipId and a reason
 * @example Request body example:
 * {
 *   "membershipId": "4wmO9ldIBDx4xadtEunZtfkhuaxTgVyH",
 *   "reason":"Was rude to staff"
 * }
 */
export const POST = staffRouteWrapper(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipRejectRouteRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    const { membershipId, reason } = data;

    try {
        const result = await db
            .update(memberships)
            .set({ status: "rejected", notes: reason })
            .where(eq(memberships.id, membershipId))
            .returning();

        if (result.length < 1) {
            return response("bad_request", {
                message: "Error Rejecting Membership - MembershipID does not map to a Membership",
            });
        }

        const data = await db
            .select({
                name: profiles.firstName,
                email: profiles.email,
            })
            .from(profiles)
            .innerJoin(
                memberships,
                and(eq(memberships.id, membershipId), eq(profiles.id, memberships.profileId)),
            );

        const profileData = data[0];
        await sendRejectionEmail({
            to: profileData.email,
            subject: "UOA Esports Club Membership Not Approved",
            name: profileData.name,
            reason: reason || "",
        });

        return response("ok", {
            message: "Membership Rejected Succesfully",
        });
    } catch (error) {
        console.error("Error Rejecting Membership:", error);
        return response("internal_server_error", {
            message: "Error Rejecting Membership - Unknown Error",
        });
    }
});
