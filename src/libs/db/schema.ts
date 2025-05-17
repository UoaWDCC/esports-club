import { boolean, integer, pgEnum, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";





export const roleEnum = pgEnum("roles", ["user", "staff"]);
export const genderEnum = pgEnum("gender", [
    "male",
    "female",
    "non_binary",
    "genderfluid",
    "other",
]);

// https://authjs.dev/getting-started/database

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
    role: roleEnum("role").default("user").notNull(),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ],
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        },
    ],
);

export const yearOfStudyEnum = pgEnum("year_of_study", [
    "First year",
    "Second year",
    "Third year",
    "Fourth year",
    "Fifth year",
    "Postgraduate",
    "Graduated",
    "Not at university",
]);

export const profiles = pgTable("profile", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    university: text("university"),
    universityId: text("university_id"),
    previousMember: boolean("previous_member").default(false).notNull(),
    tournamentPasses: integer("tournament_passes").default(0).notNull(),
    yearOfStudy: yearOfStudyEnum("year_of_study").notNull(),
    gender: genderEnum("gender").default("other").notNull(),
    updateAt: timestamp().defaultNow().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    ethnicity: text("ethnicity").default("NA"),
    currentStudy: text("current_study").default("NA").notNull(),,
    currentDegree: text("current_degree").default("NA").notNull(),,
});