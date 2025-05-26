import { profiles } from "@libs/db/schema/profiles";
import { z } from "zod";

const memberDataInsertSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    universityId: z.string(),
    previousMember: z.boolean(),
    yearOfStudy: z.enum(profiles.yearOfStudy.enumValues),
    gender: z.enum(profiles.gender.enumValues),
    ethnicity: z.string(),
    currentStudy: z.string(),
});
export type profileInsertData = typeof memberDataInsertSchema._output;
export async function validateProfile(member: profileInsertData) {
    const parsed = memberDataInsertSchema.safeParse(member);
    if (!parsed.success) {
        return { error: "Invalid input", details: parsed.error.flatten() };
    }

    return { success: true };
}
