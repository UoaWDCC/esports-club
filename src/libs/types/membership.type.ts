import { z } from "zod";

export const STATUS_OPTIONS = ["rejected", "pending", "approved"] as const;

export type StatusOptions = (typeof STATUS_OPTIONS)[number];

/**
 * Zod schema for the `memberships` table
 * use to validate an object
 */

const ZMembership = z.object({
    // TODO: switch id, profileId, invoiceId, and membershipTypeId to uuid in the future
    id: z.string(),
    profileId: z.string(),
    invoiceId: z.string(),
    membershipTypeId: z.string(),
    status: z.enum(STATUS_OPTIONS),
    createdAt: z.date(),
    notes: z.string(),
});

const ZMembershipDTO = ZMembership.omit({
    id: true,
    createdAt: true,
    notes: true,
});

type Membership = z.infer<typeof ZMembership>;
type MembershipDTO = z.infer<typeof ZMembershipDTO>;

export { ZMembership, ZMembershipDTO };
export type { Membership, MembershipDTO };
