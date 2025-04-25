import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        APP_URL: z.string().min(1),
        DRIZZLE_DATABASE_URL: z.string().min(1),
    },
    runtimeEnv: {
        APP_URL: process.env.APP_URL,
        DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
    },
});
