import { db } from "@libs/db";
import { eq, and, isNull } from "drizzle-orm";

import { profiles } from "@/libs/db/schema/profiles";
import { pgEnum } from "drizzle-orm/pg-core/columns/enum";
import { YEAR_OF_STUDY_OPTIONS } from "@libs/types/profile.type";
export const yearOfStudyEnum = pgEnum("year_of_study", YEAR_OF_STUDY_OPTIONS);


export async function linkUserToProfile(newUser: { userId: string; email: string; firstName: string; lastName: string; yearOfStudy: typeof YEAR_OF_STUDY_OPTIONS[number] }) {
    try {
        console.log(`Attempting to link user ${newUser.email} (ID: ${newUser.userId})`);

        const existingLinkedProfile = await db.query.profiles.findFirst({
            where: eq(profiles.userId, newUser.userId),
        });
        
        if (existingLinkedProfile) {
            console.log(`User ${newUser.userId} already has a linked profile`);
            return existingLinkedProfile;
        }
        
        const staffCreatedProfile = await findUnlinkedProfileByEmail(newUser.email);
        
        if (staffCreatedProfile) {
            const linkedProfile = await db.update(profiles)
                .set({
                    userId: newUser.userId,
                    updatedAt: new Date(),
                })
                .where(eq(profiles.id, staffCreatedProfile.id))
                .returning();

            console.log(`Successfully linked user ${newUser.userId} to existing profile ${staffCreatedProfile.id}`);
            return linkedProfile[0];
        } else {
            const newProfile = await db.insert(profiles)
                .values({
                    userId: newUser.userId,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    yearOfStudy: newUser.yearOfStudy,
                })
                .returning();

            console.log(`Created new profile for user ${newUser.userId}`);
            return newProfile[0];
        }
    } catch (error) {
        console.error("Error linking user to profile:", error);
        return null;
    }
}

export async function findUnlinkedProfileByEmail(email: string) {
    try {
        const profile = await db.query.profiles.findFirst({
            where: and(
                eq(profiles.email, email),
                isNull(profiles.userId) 
            ),
        });
        
        return profile || null;
    } catch (error) {
        console.error("Error finding unlinked profile:", error);
        return null;
    }
}