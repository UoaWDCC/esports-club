"use server";

import { db } from "@libs/db";
import { memberships, membershipTypes, profiles } from "@libs/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

// data -> fe:unknown be:{data: something} ->
// zod check type runtime -> fe:{data: something} be:{data: something}

export const ZMembershipStatus = z.object({
    body: z
        .object({
            valid: z.boolean(),
        })
        .optional(),
    error: z.string(),
});

export type MembershipStatus = z.infer<typeof ZMembershipStatus>;

// const valid = { body: { valid: true }, error: "" };
// const invalid = { body: { bah: true }, error: "" };

// valid:unknown
// const data = ZMembershipStatus.parse(valid);
// data:MembershipStatus
// data.body

// ZMembershipStatus.parse({});

// a member is valid if there is a single active membership (current time is between a membership)
// the membership must be paid for it to be valid
// should return boolean
export const getMembershipStatus = async (userId: string): Promise<MembershipStatus> => {
    // Find the user's profile
    // Selects id from profiles schema where userId matches the provided userId
    // To get profileId, which is just called id in the profiles schema
    // Is profile here a list of the things we select???
    const profile = await db
        .select({ id: profiles.id })
        .from(profiles)
        .where(eq(profiles.userId, userId));
    if (!profile[0])
        return {
            error: "profile not found",
        };

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
        .where(and(eq(memberships.profileId, profile[0].id), eq(memberships.isPaid, true)));

    if (!membership[0])
        return {
            error: "membership not found",
        };

    // Selects the startAt and endAt from membershipTypes schema
    // where the id in membershipTypes matches the membershipTypeId we just found
    const membershipType = await db
        .select({
            startAt: membershipTypes.startAt,
            endAt: membershipTypes.endAt,
        })
        .from(membershipTypes)
        .where(eq(membershipTypes.id, membership[0].membershipTypeId));

    if (!membershipType[0])
        return {
            error: "Membership type not found",
        };

    // Check if current date is within the membership period
    const now = new Date();
    const startAt = new Date(membershipType[0].startAt);
    const endAt = new Date(membershipType[0].endAt);

    const isValid = now >= startAt && now <= endAt;

    if (!isValid)
        return {
            error: "Membership is not within the start and end date",
        };
    return {
        body: {
            valid: isValid,
        },
        error: "",
    };
};
