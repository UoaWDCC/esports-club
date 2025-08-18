// app/api/members/route.ts
import { response } from "@libs/api/response";
import { staffRouteWrapper, userRouteWrapper } from "@libs/api/wrappers";

import { getAllMembers } from "@/services/membership/getAllMembers";

import { MemberList, MemberOrdering, ZMemberListRequest, ZMemberListResponse } from "./type";

/**
 * @description Get all profile with active membership
 */
export const POST = staffRouteWrapper<MemberList>(async (req) => {
    const { data: body, success } = ZMemberListRequest.safeParse(await req.json());

    const _default = {
        page: 1,
        limit: 50,
        ordering: {
            column: "firstName",
            descending: true,
        } as MemberOrdering,
    };

    console.log(body);
    const { members, count } = await getAllMembers(success ? body : _default);

    const data = {
        members,
        pagination: {
            totalItems: count,
            totalPage: success ? Math.ceil(count / body.limit) : Math.ceil(count / _default.limit),
            currentPage: success ? body.page : _default.page,
            limit: success ? body.limit : _default.limit,
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
