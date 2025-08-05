import { response } from "@libs/api/response";
import { userRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { profiles } from "@schema";
import { eq } from "drizzle-orm";

import { ZProfileUpdateRequest } from "./type";

// 1. getting the user id
// 2. getting the body
// 3. validating the body with ZProfileDTO
// 4. error response if body is invalid
// 5. updating the user
// 6. telling the user that the profile has been updated

export const PUT = userRouteWrapper(async (req, session) => {
    const { id: userId } = session.user;

    const body = await req.json();
    const { data, success, error } = ZProfileUpdateRequest.safeParse(body);

    if (!success) {
        return response("bad_request", {
            message: "Given body was incorrect",
            error: error.issues,
        });
    }

    await db.update(profiles).set(data).where(eq(profiles.userId, userId));

    return response("ok", {
        message: "Profile has been updated successfully",
    });
});
