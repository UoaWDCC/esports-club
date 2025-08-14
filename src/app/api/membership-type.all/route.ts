import { ApiResponse, serverResponse, toResponse } from "@libs/api/response";
import { userRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { MembershipType, ZMembershipType } from "@libs/types/membershipType.type";
import { membershipTypes } from "@schema";

/**
 * @description Get all membershipTypes
 */
export const GET = userRouteWrapper(async (_, session) => {
    return toResponse(await getAllMembershipTypes());
});

/**
 * @returns all membershipTypes in Database
 */
const getAllMembershipTypes = async (): Promise<ApiResponse<MembershipType[]>> => {
    const membershipTypesList = getAllMembershipTypes();

    const { data, success, error } = ZMembershipType.array().safeParse(membershipTypesList);

    if (!success) {
        return serverResponse("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    return serverResponse("ok", { data: data });
};
