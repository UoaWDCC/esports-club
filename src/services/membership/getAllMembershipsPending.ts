import { db } from "@libs/db";
import { memberships, membershipTypes, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

export default async function getAllMembershipsPending() {
    // Get all unpaid memberships
    const pending_memberships = await db
        .select()
        .from(profiles)
        .innerJoin(
            memberships,
            and(eq(memberships.status, "pending"), eq(profiles.id, memberships.profileId)),
        )
        .innerJoin(membershipTypes, and(eq(membershipTypes.id, memberships.membershipTypeId)));

    const fitlered_memberships = pending_memberships.filter((membershipData) => {
        const currentMembershipType = membershipData.membership_type;
        // Check if current date is within the membership period
        const now = new Date();
        const startAt = new Date(currentMembershipType.startAt);
        const endAt = new Date(currentMembershipType.endAt);

        const isValid = now >= startAt && now <= endAt;
        return isValid;
    });
    return fitlered_memberships;
}
