import { unstable_cache } from "next/cache";
import { response, ServerResponse, serverResponse, toResponse } from "@libs/api/response";
import { routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { MembershipType, ZMembershipType } from "@libs/types/membershipType.type";

import { ZMembershipTypeRequest } from "./type";

function getMembershipType(id: string) {
    return unstable_cache(
        async (): Promise<ServerResponse<MembershipType>> => {
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

/**
 * @description Get a membership type via membership type id (ms_id)
 * @example Request body example:
 * {
 *   "ms_id": "1082919f-18db-4fcf-b8d5-f62617c84945"
 * }
 */
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

    return await toResponse(await getMembershipType(requested.data.ms_id));
});
