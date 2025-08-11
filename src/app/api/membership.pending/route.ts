import { ApiResponse, isOk, response, serverResponse, toResponse } from "@libs/api/response";
import { staffRouteWrapper, userRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { memberships, membershipTypes, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

import { MembershipPendingRouteResponse, ZMembershipPendingRouteResponse } from "./type";

/**
 * @description Get all memberships that are currently pending
 */
export const GET = userRouteWrapper(async () => {
    return toResponse(await getAllMembershipsPending());
});

/**
 * @description Get all memberships that are currently pending
 */
export const POST = staffRouteWrapper<MembershipPendingRouteResponse[]>(async () => {
    const memberships = await getAllMembershipsPending();

    if (!isOk(memberships)) {
        return toResponse(memberships);
    }

    const filteredMemberships: MembershipPendingRouteResponse[] = memberships.data || [];

    return response("ok", { data: filteredMemberships });
});

/**
 * @returns all profiles with pending memberships
 */
const getAllMembershipsPending = async (): Promise<
    ApiResponse<MembershipPendingRouteResponse[]>
> => {
    // Get all unpaid memberships
    const pending_memberships = await db
        .select()
        .from(profiles)
        .innerJoin(
            memberships,
            and(eq(memberships.status, "pending"), eq(profiles.id, memberships.profileId)),
        )
        .innerJoin(membershipTypes, and(eq(membershipTypes.id, memberships.membershipTypeId)));

    const fitlered_memberships = pending_memberships.map((membershipData) => {
        const currentMembershipType = membershipData.membership_type;
        // Check if current date is within the membership period
        const now = new Date();
        const startAt = new Date(currentMembershipType.startAt);
        const endAt = new Date(currentMembershipType.endAt);

        const isValid = now >= startAt && now <= endAt;

        if (isValid) {
            return {
                ...membershipData.membership,
                firstName: membershipData.profile.firstName,
                lastName: membershipData.profile.lastName,
                email: membershipData.profile.email,
            };
        }
    });

    console.log(fitlered_memberships);
    const { data, success, error } =
        ZMembershipPendingRouteResponse.array().safeParse(fitlered_memberships);

    if (!success) {
        return serverResponse("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    return serverResponse("ok", { data: data });
};
