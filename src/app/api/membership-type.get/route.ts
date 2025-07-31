import { unstable_cache } from "next/cache";
import { ApiResponse, response, serverResponse, toResponse } from "@libs/api/response";
import { routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { MembershipType, ZMembershipType } from "@libs/types/membershipType.type";

import { ZMembershipTypeRequest } from "./type";

function getMembershipType(id: string) {
    return unstable_cache(
        async (): Promise<ApiResponse<MembershipType>> => {
            const membershipType = await db.query.membershipTypes.findFirst({
                where: (mt, { eq }) => eq(mt.id, id),
            });

            const { data, success, error } = ZMembershipType.safeParse(membershipType);

            if (!success) {
                return serverResponse("bad_request", {
                    message: "Data is missing or malformed, this should not happen",
                    error: error?.issues,
                });
            }

            return serverResponse("ok", { data });
        },
        ["membershipType", id],
        {
            tags: ["membershipType"],
            revalidate: 600,
        },
    )();
}

export const POST = routeWrapper<MembershipType>(async (req) => {
    console.log(req);

    const body = await req.json();

    const requested = ZMembershipTypeRequest.safeParse(body);

    if (!requested.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: requested.error?.issues,
        });
    }

    return await toResponse(await getMembershipType(requested.data.id));
});
