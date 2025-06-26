import { env } from "@libs/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/libs/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DRIZZLE_DATABASE_URL!,
    },
});
