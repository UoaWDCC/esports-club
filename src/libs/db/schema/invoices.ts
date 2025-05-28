import { doublePrecision, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { profiles } from ".";
import { INVOICE_TYPES, PAYMENT_METHODS, PAYMENT_STATUSES } from "../types/invoice";

export const invoiceTypeEnum = pgEnum("invoice_type", INVOICE_TYPES);
export const statusTypeEnum = pgEnum("status_type", PAYMENT_STATUSES);
export const paymentTypeEnum = pgEnum("payment_type", PAYMENT_METHODS);

/**
 * invoice is a record of any payment made by a user
 * in progress or completed
 */

export const invoices = pgTable("invoice", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    profileId: text("profile_id")
        .references(() => profiles.id)
        .notNull(),
    type: invoiceTypeEnum("type").notNull(),
    description: text("description"),
    status: statusTypeEnum("status_type").notNull(),
    paidDate: timestamp("paid_date").defaultNow().notNull(),
    paymentMethod: paymentTypeEnum("payment_method").notNull(),
    price: doublePrecision("price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
