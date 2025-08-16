import { unstable_cache } from "next/cache";
import { ApiResponse, response, serverResponse, toResponse } from "@libs/api/response";
import { routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { MembershipType, ZMembershipType } from "@libs/types/membershipType.type";
import { z } from "zod";

import { ZMembershipTypeListRequest } from "./type";

function getAllMembershipTypes(includeInactive: boolean = false) {
    return unstable_cache(
        async (): Promise<ApiResponse<MembershipType[]>> => {
            const membershipTypes = await db.query.membershipTypes.findMany({
                where: includeInactive ? undefined : (mt, { eq }) => eq(mt.isActive, true),
                orderBy: (mt, { asc }) => [asc(mt.name)],
            });

            const parsedMembershipTypes: MembershipType[] = [];
            const errors: z.ZodIssue[] = [];

            for (const membershipType of membershipTypes) {
                const { data, success, error } = ZMembershipType.safeParse(membershipType);

                if (success) {
                    parsedMembershipTypes.push(data);
                } else if (error?.issues) {
                    console.error(
                        "Validation failed for membership type:",
                        membershipType.id,
                        error.issues,
                    );
                    errors.push(...error.issues);
                }
            }

            if (errors.length > 0) {
                return serverResponse("bad_request", {
                    message: "Some membership types are missing or malformed",
                    error: errors,
                });
            }

            return serverResponse("ok", { data: parsedMembershipTypes });
        },
        ["membershipTypes", "all", includeInactive.toString()],
        {
            tags: ["membershipTypes"],
            revalidate: 600,
        },
    )();
}

/**
 * @description Get all membership types
 * @example Request body example:
 * {
 *   "includeInactive": false
 * }
 */
export const POST = routeWrapper<MembershipType[]>(async (req) => {
    const body = await req.json();

    const requested = ZMembershipTypeListRequest.safeParse(body);

    if (!requested.success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: requested.error?.issues,
        });
    }

    return await toResponse(await getAllMembershipTypes(requested.data.includeInactive));
});
