import { unstable_cache } from "next/cache";
import { ApiErrorResponse, ApiResponse } from "@libs/api/responses";
import { RouteContext, routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema";
import { eq } from "drizzle-orm";

function getMembershipType(id: string) {
    return unstable_cache(
        async () => {
            return await db.select().from(membershipTypes).where(eq(membershipTypes.id, id));
        },
        ["membershipType", id],
        {
            tags: ["membershipType"],
            revalidate: 600,
        },
    )();
}

export const GET = routeWrapper(async (req, session, context: RouteContext<"id">) => {
    const { id } = await context.params;

    const membershipType = await getMembershipType(id);

    if (membershipType[0]) return ApiResponse("ok", membershipType[0]);

    return ApiErrorResponse("not_found", "cound not find the requested membershipType");
});
