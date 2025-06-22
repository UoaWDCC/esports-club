import { auth } from "@libs/auth/auth";
import { db } from "@libs/db";
import { ZMembership } from "@libs/types/membership.type";
import { invoices, memberships, membershipTypes, profiles, users } from "@schema";
import { eq } from "drizzle-orm";

export const GET = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userData = await db
        .select()
        .from(users)
        .innerJoin(profiles, eq(users.id, profiles.userId))
        .innerJoin(memberships, eq(profiles.id, memberships.profileId))
        .innerJoin(membershipTypes, eq(memberships.membershipTypeId, membershipTypes.id))
        .innerJoin(invoices, eq(memberships.invoiceId, invoices.id))
        .where(eq(users.id, userId))
        .limit(1);

    const { data, error } = ZMembership.safeParse(userData[0].membership);

    if (error) {
        return new Response(error.message, { status: 400 });
    }

    return new Response(JSON.stringify(data, null, 2));
};
