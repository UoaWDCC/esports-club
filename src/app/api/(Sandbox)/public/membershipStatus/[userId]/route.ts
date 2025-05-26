"use server";

import { db } from "@libs/db";
import { memberships, membershipTypes, profiles } from "@libs/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

// a member is valid if there is a single active membership (current time is between a membership)
// the membership must be paid for it to be valid
// should return boolean
export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
  ) => {
    const {userId} = await params;

    console.log("userId", userId);
    
    // Find the user's profile
    // Selects id from profiles schema where userId matches the provided userId
    // To get profileId, which is just called id in the profiles schema
    // Is profile here a list of the things we select???
    const profile = await db
        .select({ id: profiles.id })
        .from(profiles)
        .where(eq(profiles.userId, userId));

    console.log("profile", profile);

    if (!profile[0]) return NextResponse.json({ body: false });
    
    // const profileIda = await db.select().from(profiles).where(eq(profiles.userId, userId))
    // .innerjoin(profiles, eq(users.id, profiles.id))

    // Find a paid membership for this profile
    // Selects the membershipTypeId from memberships schema where profileId matches
    // the profileId we just found and isPaid is true
    const membership = await db
        .select({
            membershipTypeId: memberships.membershipTypeId,
        })
        .from(memberships)
        .where(
            and(
                eq(memberships.profileId, profile[0].id),
                eq(memberships.isPaid, true)
            )
        );

    console.log("membership", membership);
    if (!membership[0]) return NextResponse.json({ body: false });

    // Selects the startAt and endAt from membershipTypes schema
    // where the id in membershipTypes matches the membershipTypeId we just found
    const membershipType = await db
        .select({
            startAt: membershipTypes.startAt,
            endAt: membershipTypes.endAt,
        })
        .from(membershipTypes)
        .where(eq(membershipTypes.id, membership[0].membershipTypeId));

    console.log("membershipType", membershipType);
    if (!membershipType[0]) return NextResponse.json({ body: false });

    // Check if current date is within the membership period
    const now = new Date();
    const startAt = new Date(membershipType[0].startAt);
    const endAt = new Date(membershipType[0].endAt);

    const isMember =  now >= startAt && now <= endAt;
    return NextResponse.json({ body: isMember });
}
