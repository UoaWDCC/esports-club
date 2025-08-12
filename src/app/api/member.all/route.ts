// app/api/members/route.ts
import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";

import { getAllMembers } from "@/services/membership/getAllMembers";

import { MemberAllResponse, ZMemberAllGetResponse } from "./type";

/**
 * @description Get all profile with active membership
 */
export const GET = staffRouteWrapper<MemberAllResponse>(async () => {
    const members = await getAllMembers();

    const parsedMembers = ZMemberAllGetResponse.safeParse(members);

    if (!parsedMembers.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: parsedMembers.error?.issues,
        });
    }

    return response("ok", { data: parsedMembers.data });
});

/**
 * @description Get a range of profile with active membership
 * @param {Object} MemberAllResponse
 * @param {number} MemberAllResponse.limit - The maximum number of profiles to retrieve.
 * @param {number} MemberAllResponse.offset - The number of profiles to skip before retrieving.
 */
export const POST = staffRouteWrapper<MemberAllResponse>(async () => {
    const members = await getAllMembers();

    const parsedMembers = ZMemberAllGetResponse.safeParse(members);

    if (!parsedMembers.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: parsedMembers.error?.issues,
        });
    }

    return response("ok", { data: parsedMembers.data });
});
