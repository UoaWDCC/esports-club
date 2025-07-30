import { response } from "@libs/api/response";
import { staffRouteWrapper, userRouteWrapper } from "@libs/api/wrappers";

import { getActiveMemberships } from "@/services/membership/getActiveMembership";

import { MembershipStatusRouteResponse, ZMembershipStatusRouteRequest } from "./type";

// require authentication
export const GET = userRouteWrapper<MembershipStatusRouteResponse>(async (_, session) => {
    const { id: userId } = session.user;

    return await getActiveMemberships(userId);
});

// staff only
export const POST = staffRouteWrapper<MembershipStatusRouteResponse>(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipStatusRouteRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    return await getActiveMemberships(data.userId);
});
