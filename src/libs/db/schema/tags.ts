import { pgTable, text } from "drizzle-orm/pg-core";

export const tags = pgTable("tag", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    description: text("description").notNull(),
    border: text("border").notNull(),
    background: text("background").notNull(),
    foreground: text("foreground").notNull(),
});
