import { GENDER_OPTIONS, YEAR_OF_STUDY_OPTIONS } from "@libs/types/profile.type";
import { user } from "@schema";
import { boolean, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", GENDER_OPTIONS);
export const yearOfStudyEnum = pgEnum("year_of_study", YEAR_OF_STUDY_OPTIONS);

/**
 * profile is the main schema for user account
 * it is seperate from the user schema to allow in person members register by the staff
 */

export const profiles = pgTable("profile", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => user.id),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    university: text("university"),
    universityId: text("university_id"),
    previousMember: boolean("previous_member").default(false).notNull(),
    tournamentPasses: integer("tournament_passes").default(0).notNull(),
    yearOfStudy: yearOfStudyEnum("year_of_study").notNull(),
    gender: genderEnum("gender").default("other").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    ethnicity: text("ethnicity").default("NA"),
    currentStudy: text("current_study").default("NA").notNull(),
    currentDegree: text("current_degree").default("NA").notNull(),
});
