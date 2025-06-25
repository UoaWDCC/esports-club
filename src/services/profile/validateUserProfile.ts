import { db } from "@libs/db";
import { ZProfileDTO } from "@libs/types/profile.type";
import { profiles } from "@schema";
import { eq } from "drizzle-orm";

export async function validateUserProfile(userId: string) {
    const profile = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
    const result = ZProfileDTO.safeParse(profile[0]);

    return result;
}
