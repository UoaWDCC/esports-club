import { unstable_cache } from "next/cache";
import { Response, response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { MembershipType, ZMembershipType } from "@libs/types/membershipType.type";

import { ZMembershipTypeRequest } from "./type";

function getMembershipType(id: string): Promise<Response<MembershipType>> {
    return unstable_cache(
        async (): Promise<Response<MembershipType>> => {
            const membershipType = await db.query.membershipTypes.findFirst({
                where: (mt, { eq }) => eq(mt.id, id),
            });

            const { data, success, error } = ZMembershipType.safeParse(membershipType);

            if (!success) {
                return response("bad_request", {
                    message: "Data is missing or malformed, this should not happen",
                    error: error?.issues,
                });
            }

            return response("ok", { data });
        },
        ["membershipType", id],
        {
            tags: ["membershipType"],
            revalidate: 600,
        },
    )();
}

export const POST = staffRouteWrapper<MembershipType>(async (req) => {
    console.log(req);

    const body = await req.json();

    const requested = ZMembershipTypeRequest.safeParse(body);

    if (!requested.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: requested.error?.issues,
        });
    }

    return await getMembershipType(requested.data.id);
});
