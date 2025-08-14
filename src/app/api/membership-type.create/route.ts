import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { ZMembershipTypeDTO } from "@libs/types/membershipType.type";
import { membershipTypes } from "@schema";

export const POST = staffRouteWrapper(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipTypeDTO.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    await db.insert(membershipTypes).values(data);

    return response("created", {
        message: "Membership Type created successfully",
    });
});
