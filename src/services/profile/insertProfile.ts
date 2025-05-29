// app/components/actions.js
"use server";

import { db } from "@libs/db";
import { profiles } from "@libs/db/schema/profiles";
import { ProfileDTO } from "@libs/types/profile.type";

import { validateProfile } from "./validateProfile";

export async function insertMember(member: ProfileDTO) {
    try {
        const result = await validateProfile(member);
        if (result.error) {
            throw new Error(result.error);
        }

        return await db.insert(profiles).values(member).returning().execute();
    } catch (error) {
        console.error("Error inserting user:", error);
        return error;
    }
}
