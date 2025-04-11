import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DRIZZLE_DATABASE_URL: z.string().min(1),
    },
    // this can be used in Next.js^13.4.4 and above, thx david
    // client side runtime environment variables still need to be manually destructured
    experimental__runtimeEnv: process.env,
    skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
