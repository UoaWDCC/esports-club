import { redirect } from "next/navigation";
import { response } from "@libs/api/response";
import { userRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { DEFAULT_PROFILE_REDIRECT } from "@libs/routes";
import { ProfileInsertionDTO, ZProfileCreationDTO } from "@libs/types/profile.type";
import { profiles } from "@schema";
import { eq } from "drizzle-orm";

import { ZProfilePostRequest } from "./type";

/**
 * @description Create a new profile if the logged in user does not have one
 * @example Request body example: TBA
 */
export const POST = userRouteWrapper(async (req, session) => {
    const res = await req.json();

    // infer values from user in db
    const { id: userId, email, emailVerified } = session.user;

    // validate body
    // TODO: replace with type.ts type
    const { data, success, error } = ZProfilePostRequest.safeParse(res);
    if (!success) {
        return response("bad_request", {
            message: "Data is missing or malformed",
            error: error?.issues,
        });
    }

    if (!emailVerified) {
        return response("unauthorized", { message: "Email is not verified" });
    }

    const existingProfile = await db
        .select()
        .from(profiles)
        .where(eq(profiles.userId, userId))
        .limit(1);

    if (existingProfile.length != 0) {
        redirect(DEFAULT_PROFILE_REDIRECT);
    }

    // create profile
    const profileInsertion = {
        ...data,
        userId: userId,
        email: email,
        previousMember: false,
    } as ProfileInsertionDTO;

    await db.insert(profiles).values(profileInsertion);

    return response("created", {
        message: "Profile created successfully",
    });
});
