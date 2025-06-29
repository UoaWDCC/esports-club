import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// t3-oss env object that validates env variables and restricts access to only server-side
export const env = createEnv({
    server: {
        ENVIRONMENT: z.enum(["development", "test", "production"]).default("production"),
        APP_URL: z.string().url().default("https://esports.wdcc.co.nz"),
        BETTER_AUTH_URL: z.string().url().default("https://esports.wdcc.co.nz"),
        // use openssl rand -base64 24
        BETTER_AUTH_SECRET: z.string().min(32),
        DRIZZLE_DATABASE_URL: z.string().min(1),
        AUTH_GOOGLE_ID: z.string().min(1),
        AUTH_GOOGLE_SECRET: z.string().min(1),
        MAIL_HOST: z.string().min(1),
        MAIL_PORT: z.string().min(3),
        MAIL_USER: z.string().min(1),
        MAIL_PASSWORD: z.string().min(1),
        TEST_EMAIL: z.string().optional(),
        ROUTE_PROTECTION_BYPASS: z.enum(["enabled", "disabled"]).default("disabled"),
    },
    runtimeEnv: {
        APP_URL: process.env.APP_URL,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        ENVIRONMENT: process.env.ENVIRONMENT,
        DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_PORT: process.env.MAIL_PORT,
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASSWORD: process.env.MAIL_PASSWORD,
        TEST_EMAIL: process.env.TEST_EMAIL,
        ROUTE_PROTECTION_BYPASS: process.env.ROUTE_PROTECTION_BYPASS,
    },
});
