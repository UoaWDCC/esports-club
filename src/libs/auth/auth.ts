import { headers } from "next/headers";
import { db } from "@libs/db";
import { sendVerificationEmail as sendEmail } from "@libs/email/verification-email";
import { env } from "@libs/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";

import { ac, admin, staff, user } from "./permission";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    plugins: [
        adminPlugin({
            ac,
            defaultRole: "user",
            roles: {
                user,
                staff,
                admin,
            },
        }),
    ],
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: "Verify your email address",
                url: url,
            });
        },
    },

    socialProviders: {
        google: {
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        },
    },
});

export const getSession = async (req?: Request) => {
    const result = await auth.api.getSession(req || { headers: await headers() });

    return result as AuthSession;
};

export type AuthSession = {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
};
