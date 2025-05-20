import { env } from "@libs/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as accounts from "./schema/accounts";
import * as invoices from "./schema/invoices";
import * as membershipTypes from "./schema/membership_types";
import * as memberships from "./schema/memberships";
import * as profiles from "./schema/profiles";
import * as sessions from "./schema/sessions";
import * as users from "./schema/users";
import * as verificationToken from "./schema/verificationTokens";

const schema = {
    ...accounts,
    ...invoices,
    ...membershipTypes,
    ...memberships,
    ...profiles,
    ...sessions,
    ...users,
    ...verificationToken,
};

const sql = neon(env.DRIZZLE_DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
