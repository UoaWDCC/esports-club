"use server";

import { db } from "@libs/db";
import { memberships, membershipTypes, profiles } from "@libs/db/schema";
import { and, eq } from "drizzle-orm";

export interface MembershipStatus {
    isValid: boolean;
    membership?: {
        id: string;
        membershipTypeId: string;
        isPaid: boolean;
        createdAt: Date;
    };
    membershipType?: {
        id: string;
        name: string;
        description?: string;
        startAt: Date;
        endAt: Date;
        price: number;
    };
    error?: string;
}

// Check if a user has a valid, paid membership that is currently active
export const getMembershipStatus = async (userId: string): Promise<MembershipStatus> => {
    try {
        // Find the user's profile
        const profile = await db
            .select({ id: profiles.id })
            .from(profiles)
            .where(eq(profiles.userId, userId))
            .limit(1);

        if (!profile[0]) {
            return {
                isValid: false,
                error: "Profile not found",
            };
        }

        // Find the most recent paid membership for this profile
        const membership = await db
            .select({
                id: memberships.id,
                membershipTypeId: memberships.membershipTypeId,
                isPaid: memberships.isPaid,
                createdAt: memberships.createdAt,
            })
            .from(memberships)
            .where(and(eq(memberships.profileId, profile[0].id), eq(memberships.isPaid, true)))
            .orderBy(memberships.createdAt)
            .limit(1);

        if (!membership[0]) {
            return {
                isValid: false,
                error: "No paid membership found",
            };
        }

        // Get the membership type details
        const membershipType = await db
            .select({
                id: membershipTypes.id,
                name: membershipTypes.name,
                description: membershipTypes.description,
                startAt: membershipTypes.startAt,
                endAt: membershipTypes.endAt,
                price: membershipTypes.price,
            })
            .from(membershipTypes)
            .where(eq(membershipTypes.id, membership[0].membershipTypeId))
            .limit(1);

        if (!membershipType[0]) {
            return {
                isValid: false,
                error: "Membership type not found",
            };
        }

        // Check if current date is within the membership period
        const now = new Date();
        const startAt = new Date(membershipType[0].startAt);
        const endAt = new Date(membershipType[0].endAt);

        const isValid = now >= startAt && now <= endAt;

        if (!isValid) {
            return {
                isValid: false,
                membership: membership[0],
                membershipType: {
                    ...membershipType[0],
                    description: membershipType[0].description || undefined,
                },
                error: "Membership has expired",
            };
        }

        return {
            isValid: true,
            membership: membership[0],
            membershipType: {
                ...membershipType[0],
                description: membershipType[0].description || undefined,
            },
        };
    } catch (error) {
        console.error("Error checking membership status:", error);
        return {
            isValid: false,
            error: "Error checking membership status",
        };
    }
};
