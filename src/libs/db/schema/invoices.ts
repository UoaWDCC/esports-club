import { pgTable, text } from "drizzle-orm/pg-core";

export const invoices = pgTable("invoice", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
});
