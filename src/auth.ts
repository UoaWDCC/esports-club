import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@libs/db";
import { accounts } from "@libs/db/schema/accounts";
import { sessions } from "@libs/db/schema/sessions";
import { users } from "@libs/db/schema/users";
import { verificationTokens } from "@libs/db/schema/verificationTokens";
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60,
    },
    providers: [
        // AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET are defined in .env
        GoogleProvider({
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: "user",
                };
            },
        }),
    ],
    // give role property to session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                session.user.role = user.role;
            }
            return session;
        },
    },
    // debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
