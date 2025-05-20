import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const membershipTypes = pgTable("membership_type", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    description: text("description"),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at").notNull(),
    price: integer("price").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    updateAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
