// app/api/members/route.ts
import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";

import { getAllMembers } from "@/services/membership/getAllMembers";

import { MemberList, ZMemberListResponse } from "./type";

/**
 * @description Get all profile with active membership
 */
export const POST = staffRouteWrapper<MemberList>(async () => {
    const { members, count } = await getAllMembers();

    const data = {
        members,
        pagination: {
            totalItems: count,
        },
    };

    const parsedMembers = ZMemberListResponse.safeParse(data);

    if (!parsedMembers.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: parsedMembers.error?.issues,
        });
    }

    return response("ok", { data: parsedMembers.data });
});
