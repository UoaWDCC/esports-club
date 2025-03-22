import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const pool = postgres(process.env.DRIZZLE_DATABASE_URL!, { max: 1 });
export const db = drizzle(pool);
