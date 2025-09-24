import { response } from "@libs/api/response";
import { routeWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { User } from "better-auth";
import { and, eq, isNull } from "drizzle-orm";

import { profiles } from "@/libs/db/schema/profiles";

export const GET = routeWrapper(async () => {

    const profile = await db.query.profiles.findFirst({
        where: and(eq(profiles.email, "ecre456@aucklanduni.ac.nz"), isNull(profiles.userId)),
    });

    console.log(profile);

    return response("ok", profile as any);
});
