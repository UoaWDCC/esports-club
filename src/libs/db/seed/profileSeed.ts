import "dotenv/config";

import { eq } from "drizzle-orm";

import { db } from "..";
import { profiles } from "../schema/profiles";
import { users } from "../schema/users";

async function seedProfiles() {
    // Fetch all users
    const allUsers = await db.select().from(users);

    for (const user of allUsers) {
        // Check if a profile already exists for this user to avoid duplicates
        const existingProfile = await db
            .select()
            .from(profiles)
            .where(eq(profiles.userId, user.id))
            .limit(1);

        if (existingProfile.length > 0) {
            console.log(`Profile already exists for user ${user.id}, skipping...`);
            continue;
        }

        // Insert profile for user with some default or dummy data
        await db
            .insert(profiles)
            .values({
                userId: user.id,
                firstName: user.name?.split(" ")[0] ?? "FirstName",
                lastName: user.name?.split(" ")[1] ?? "LastName",
                email: user.email!,
                university: "Unknown University",
                universityId: "", // empty string if not nullable, or update schema to nullable
                previousMember: false,
                tournamentPasses: 0,
                yearOfStudy: "Not at university",
                gender: "other",
                ethnicity: "NA",
                currentStudy: "NA",
                currentDegree: "NA",
            })
            .execute();

        console.log(`Inserted profile for user ${user.id}`);
    }
}

seedProfiles()
    .then(() => {
        console.log("Seeding profiles completed!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error seeding profiles:", err);
        process.exit(1);
    });
