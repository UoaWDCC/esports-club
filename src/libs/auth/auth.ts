import { headers } from "next/headers";
import { db } from "@libs/db";
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
    socialProviders: {
        google: {
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        },
    },
});

export const useSession = async () => {
    return auth.api.getSession({
        headers: await headers(),
    });
};
