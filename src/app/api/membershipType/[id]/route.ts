import { ApiErrorResponse } from "@libs/api/responses";
import { RouteContext, routeWrapper } from "@libs/api/wrappers";

export const GET = routeWrapper(async (req, session, context: RouteContext<"id">) => {
    const { id } = await context.params;

    return ApiErrorResponse("bad_request", null, { id });
});
