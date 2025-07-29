import { STATUS_OPTIONS } from "@libs/types/membership.type";
import { invoices, membershipTypes, profiles } from "@schema";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", STATUS_OPTIONS);

export const memberships = pgTable("membership", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    profileId: text("profile_id")
        .references(() => profiles.id, { onDelete: "cascade" })
        .notNull(),
    invoiceId: text("invoice_id")
        .references(() => invoices.id, { onDelete: "cascade" })
        .notNull(),
    membershipTypeId: text("membership_type_id")
        .references(() => membershipTypes.id, { onDelete: "cascade" })
        .notNull(),
    status: statusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    notes: text("notes").default(""),
});
