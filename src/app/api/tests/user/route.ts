import { routeWrapper } from "@libs/api/wrappers";
import { getSession } from "@libs/auth/auth";
import { db } from "@libs/db";
import { ZMembership } from "@libs/types/membership.type";
import { invoices, memberships, membershipTypes, profiles, user } from "@schema";
import { eq } from "drizzle-orm";

export const GET = routeWrapper(async (req) => {
    const session = await getSession(req);
    const userId = session?.user?.id;

    const userData = await db
        .select()
        .from(user)
        .innerJoin(profiles, eq(user.id, profiles.userId))
        .leftJoin(memberships, eq(profiles.id, memberships.profileId))
        .leftJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id))
        .leftJoin(invoices, eq(memberships.invoiceId, invoices.id))
        .where(eq(user.id, userId));

    if (!userData[0]) {
        return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(userData[0], null, 2));
});
