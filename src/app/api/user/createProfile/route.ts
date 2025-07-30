import { response, Response } from "@libs/api/response";
import { routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { ProfileInsertionDTO, ZProfileCreationDTO } from "@libs/types/profile.type";
import { profiles } from "@schema";
import { eq } from "drizzle-orm";

export const POST = routeWrapper(async (req, session): Promise<Response> => {
    const res = await req.json();

    // infer values from user in db
    const { id: userId, email, emailVerified } = session.user;
    // validate data
    const { data, success } = ZProfileCreationDTO.safeParse(res);

    // check is request body is valid
    if (!success) {
        return response("bad_request", { message: "Data is missing or malformed" });
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
        return response("bad_request", {
            message: "A profile linked to this email already exists, please refresh",
        });
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
