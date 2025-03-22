import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@libs/db";
import { accounts, sessions, users, verificationTokens } from "@libs/db/schema";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [GoogleProvider],
});
