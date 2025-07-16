import { db } from "@libs/db";
import { memberships, membershipTypes, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

export default async function getAllMembershipsUnpaid() {
    // Get all unpaid memberships
    const unpaid_memberships = await db
        .select()
        .from(profiles)
        .innerJoin(
            memberships,
            and(eq(memberships.isPaid, false), eq(profiles.id, memberships.profileId)),
        )
        .innerJoin(membershipTypes, and(eq(membershipTypes.id, memberships.membershipTypeId)));

    const fitlered_memberships = unpaid_memberships.filter((membershipData) => {
        const currentMembershipType = membershipData.membership_type;
        // Check if current date is within the membership period
        const now = new Date();
        const startAt = new Date(currentMembershipType.startAt);
        const endAt = new Date(currentMembershipType.endAt);

        const isValid = now >= startAt && now <= endAt;
        console.log(isValid);
        return isValid;
    });
    console.log(fitlered_memberships);
    return unpaid_memberships;
}
