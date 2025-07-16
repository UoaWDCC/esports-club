import { ApiResponse } from "@libs/api/responses";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { getSession } from "@libs/auth/auth";

import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

export const GET = staffRouteWrapper(async (req, session) => {
    const status = await getMembershipStatus(session.user.id);
    return ApiResponse("ok", status);
});
