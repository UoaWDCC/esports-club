import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        ENVIRONMENT: z.enum(["development", "test", "production"]).default("development"),
        APP_URL: z.string().min(1),
        DRIZZLE_DATABASE_URL: z.string().min(1),
        AUTH_GOOGLE_ID: z.string().min(1),
        AUTH_GOOGLE_SECRET: z.string().min(1),
        MAIL_HOST: z.string().min(1),
        MAIL_PORT: z.coerce.number().min(1),
        MAIL_USER: z.string().min(1),
        MAIL_PASSWORD: z.string().min(1),
        TEST_EMAIL: z.string().min(1),
    },
    runtimeEnv: {
        APP_URL: process.env.APP_URL,
        ENVIRONMENT: process.env.ENVIRONMENT,
        DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_PORT: process.env.MAIL_PORT,
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASSWORD: process.env.MAIL_PASSWORD,
        TEST_EMAIL: process.env.TEST_EMAIL,
    },
});
