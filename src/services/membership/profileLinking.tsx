import { db } from "@libs/db";
import { eq, and, isNull } from "drizzle-orm";

import { profiles } from "@/libs/db/schema/profiles";
import { pgEnum } from "drizzle-orm/pg-core/columns/enum";
import { YEAR_OF_STUDY_OPTIONS } from "@libs/types/profile.type";
export const yearOfStudyEnum = pgEnum("year_of_study", YEAR_OF_STUDY_OPTIONS);


export async function linkUserToProfile(newUser: any) {
    try {
        console.log(`Attempting to link user ${newUser.email} (ID: ${newUser.id})`);

        const existingLinkedProfile = await db.query.profiles.findFirst({
            where: eq(profiles.id, newUser.id),
        });
        
        if (existingLinkedProfile) {
            console.log(`User ${newUser.id} already has a linked profile`);
            return existingLinkedProfile;
        }
        
        const staffCreatedProfile = await findUnlinkedProfileByEmail(newUser.email);
        
        if (staffCreatedProfile) {
            const linkedProfile = await db.update(profiles)
                .set({
                    userId: newUser.id,
                    updatedAt: new Date(),
                })
                .where(eq(profiles.id, staffCreatedProfile.id))
                .returning();

            console.log(`Successfully linked user ${newUser.id} to existing profile ${staffCreatedProfile.id}`);
            return linkedProfile[0];
        } else {
            // const nameParts = newUser.name.trim().split(' ');
            // const firstName = nameParts[0] || '';
            // const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
            
            const newProfile = await db.insert(profiles)
                .values({
                    userId: newUser.id,
                    firstName: firstName,
                    lastName: lastName,
                    email: newUser.email,
                    yearOfStudy: 'other',
                    previousMember: false,
                    tournamentPasses: 0,
                    gender: 'other',
                    ethnicity: 'NA',
                    currentStudy: 'NA',
                    currentDegree: 'NA',
                    university: null,
                    universityId: null,
                })
                .returning();

            console.log(`Created new profile for user ${newUser.id}`);
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
                isNull(profiles.id) 
            ),
        });
        
        return profile || null;
    } catch (error) {
        console.error("Error finding unlinked profile:", error);
        return null;
    }
}