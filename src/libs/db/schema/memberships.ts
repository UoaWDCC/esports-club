import { invoices, membershipTypes, profiles } from "@schema";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const memberships = pgTable("membership", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    profileId: text("profile_id")
        .references(() => profiles.id)
        .notNull(),
    invoiceId: text("invoice_id")
        .references(() => invoices.id)
        .notNull(),
    membershipTypeId: text("membership_type_id")
        .references(() => membershipTypes.id)
        .notNull(),
    isPaid: boolean("is_paid").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
