import "dotenv/config";

import { profiles } from "@schema";
import { eq } from "drizzle-orm";

import { db } from "..";

/**
 * seeds profiles
 * usage tsx '.\src\libs\db\seed\stripProfileName.seed.ts'
 */

async function normalizeProfileNames() {
    try {
        // Fetch all profiles
        const allProfiles = await db.select().from(profiles);

        for (const profile of allProfiles) {
            const trimmedFirst = profile.firstName?.trim() || null;
            const trimmedLast = profile.lastName?.trim() || null;

            // Update only if values actually changed
            if (trimmedFirst !== profile.firstName || trimmedLast !== profile.lastName) {
                await db
                    .update(profiles)
                    .set({
                        firstName: trimmedFirst || profile.firstName,
                        lastName: trimmedLast || profile.lastName,
                    })
                    .where(eq(profiles.id, profile.id)); // assuming 'id' is your primary key
            }
        }

        console.log("✅ Finished normalizing names");
    } catch (error) {
        console.error("❌ Error normalizing names:", error);
    }
}

normalizeProfileNames();
