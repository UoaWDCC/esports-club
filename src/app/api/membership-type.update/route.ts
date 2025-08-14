import { response } from "@libs/api/response";
import { staffRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { ZMembershipType } from "@libs/types/membershipType.type";
import { membershipTypes } from "@schema";
import { eq } from "drizzle-orm";

export const PUT = staffRouteWrapper(async (req) => {
    const body = await req.json();

    const { data, success, error } = ZMembershipType.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    await db.update(membershipTypes).set(data).where(eq(membershipTypes.id, data.id));

    return response("ok", {
        message: "MembershipType has been updated successfully",
    });
});
