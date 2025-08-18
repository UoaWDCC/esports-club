import { response, ServerResponse, serverResponse, toResponse } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { profiles } from "@schema";
import { and, asc, desc, eq } from "drizzle-orm";

import { ProfileListRequest, ProfileListResponse, ZProfileListRequest } from "./type";

/**
 * @description Get all profiles
 */
export const GET = staffRouteWrapper(async (_) => {
    return toResponse(await getProfiles());
});

/**
 * @description Get all profiles based off filter
 * @example Request body example:
 * {
 *   "p_id": "4wmO9ldIBDx4xadtEunZtfkhuaxTgVyH"
 * }
 */
export const POST = staffRouteWrapper<ProfileListResponse>(async (req) => {
    const body = await req.json();
    const { data, success, error } = ZProfileListRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }
    return toResponse(await getProfiles(data));
});

/**
 * @param userId
 * @returns all memberships
 */
const getProfiles = async (
    request: ProfileListRequest = {},
): Promise<ServerResponse<ProfileListResponse>> => {
    const column = request.ordering
        ? (profiles[request.ordering?.column] ?? profiles.firstName)
        : profiles.firstName;

    const profileList = await db
        .select()
        .from(profiles)
        .where(
            and(
                request.p_id ? eq(profiles.id, request.p_id) : undefined,
                request.first_name ? eq(profiles.firstName, request.first_name) : undefined,
                request.last_name ? eq(profiles.lastName, request.last_name) : undefined,
                request.email ? eq(profiles.email, request.email) : undefined,
                request.university ? eq(profiles.university, request.university) : undefined,
            ),
        )
        .orderBy(request.ordering?.descending ? desc(column) : asc(column));

    if (!profileList[0]) return serverResponse("no_content", { message: "No Profiles" });

    return serverResponse("ok", { data: { profiles: profileList } });
};
