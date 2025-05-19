import { InferSelectModel } from "drizzle-orm";

import { profiles } from "../schema/profiles";

export type Profile = InferSelectModel<typeof profiles>;
