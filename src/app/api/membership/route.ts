import { db } from "@libs/db";
import { invoices, memberships, membershipTypes, profiles, users } from "@schema";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";

export const GET = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    console.log(userId);

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const membership = await db
        .select()
        .from(users)
        .innerJoin(profiles, eq(users.id, profiles.userId))
        .innerJoin(memberships, eq(profiles.id, memberships.profileId))
        .innerJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id))
        .innerJoin(invoices, eq(memberships.invoiceId, invoices.id))
        .where(eq(users.id, userId));

    return new Response(JSON.stringify(membership, null, 2));
};
