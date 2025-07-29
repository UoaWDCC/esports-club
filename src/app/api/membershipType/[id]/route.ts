import { unstable_cache } from "next/cache";
import { Response, response } from "@libs/api/response";
import { RouteContext, routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema";
import { MembershipTypeDTO, ZMembershipTypeDTO } from "@libs/types/membershipType.type";
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

export const GET = routeWrapper(
    async (req, session, context: RouteContext<"id">): Promise<Response<MembershipTypeDTO>> => {
        const { id } = await context.params;

        const membershipType = await getMembershipType(id);
        const { data, error } = ZMembershipTypeDTO.safeParse(membershipType);

        if (data) return response("ok", { data });

        return response("not_found", { message: "cound not find the requested membershipType" });
    },
);
