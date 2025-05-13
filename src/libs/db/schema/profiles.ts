import { pgEnum, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["F", "M", "NA"]);

export const profiles = pgTable("profile", {
    profileID: text("profile_ID").notNull().primaryKey(),
    userID: text("user_ID").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    universityID: text("studentID").notNull(),
    gender: genderEnum("gender").notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});
