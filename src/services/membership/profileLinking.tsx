import { db } from "@libs/db";
import { User } from "better-auth";
import { and, eq, isNull } from "drizzle-orm";

import { profiles } from "@/libs/db/schema/profiles";

export async function linkProfileByUser(user: User) {
    try {
        // get unlinked profile
        const profile = await db.query.profiles.findFirst({
            where: and(eq(profiles.email, user.email), isNull(profiles.userId)),
        });

        if (!profile) return;

        const linkedProfile = await db
            .update(profiles)
            .set({
                userId: user.id,
                updatedAt: new Date(),
            })
            .where(eq(profiles.id, profile.id))
            .returning();

        return profile || null;
    } catch (error) {
        console.error("Error finding unlinked profile:", error);
        return null;
    }
}
