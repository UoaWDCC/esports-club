import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

import { users } from ".";

/**
 *       /\、
 *     (˚ˎ 。7  •ᴗ• this is only for auth, pls do not edit✨
 *      |、˜〵
 *     じしˍ,)ノ
 */

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
