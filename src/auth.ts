import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@libs/db";
import { accounts, sessions, users, verificationTokens } from "@libs/db/schema";
import { signInSchema } from "@libs/zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        // AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET are defined in .env
        GoogleProvider,
        // Credentials is very cooked at the moment so we ignore for now xdx
        Credentials({
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials) => {
                // check for empty fields
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                // validate credentials through zod
                const { email, password } = await signInSchema.parseAsync(credentials);

                const user = await db.query.users.findFirst({
                    where: eq(users.email, email),
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials.");
                }

                const isValid = await bcrypt.compare(password ?? "", user.password);

                if (!isValid) {
                    throw new Error("Invalid credentials.");
                }

                // return user object with their profile data
                return { id: user.id, email: user.email, name: user.name, role: user.role };
            },
        }),
    ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
