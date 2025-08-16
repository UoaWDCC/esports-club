// app/api/members/route.ts
import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";

import { getAllMembers } from "@/services/membership/getAllMembers";

import { MemberResponse, ZMemberResponse } from "./type";

/**
 * @description Get all profile with active membership
 */
export const GET = staffRouteWrapper<MemberResponse>(async () => {
    const { members, count } = await getAllMembers();

    const data = {
        members,
        pagination: {
            totalItems: count,
        },
    };

    const parsedMembers = ZMemberResponse.safeParse(data);

    if (!parsedMembers.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: parsedMembers.error?.issues,
        });
    }

    return response("ok", { data: parsedMembers.data });
});
