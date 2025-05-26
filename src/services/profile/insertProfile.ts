// app/components/actions.js
"use server";

import { db } from "@libs/db";
import { profiles } from "@libs/db/schema/profiles";

import { profileInsertData, validateProfile } from "./validateProfile";

export async function insertMember(member: profileInsertData) {
    try {
        const valid = await validateProfile(member);
        if (valid.error) {
            console.error("Error inserting user:", valid.error);
            return valid;
        }
        await db.insert(profiles).values(member);
        return true;
    } catch (error) {
        console.error("Error inserting user:", error);
        return error;
    }
}
