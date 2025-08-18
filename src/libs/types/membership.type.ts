import { z } from "zod";

// seperated to be imported for neon pg and zod
export const STATUS_OPTIONS = ["rejected", "pending", "approved"] as const;

export const ZStatusOptions = z.enum(STATUS_OPTIONS);

export type StatusOption = z.infer<typeof ZStatusOptions>;

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
    status: ZStatusOptions,
    createdAt: z.coerce.date(),
    notes: z.string(),
});

const ZMembershipDTO = ZMembership.omit({
    id: true,
    createdAt: true,
    notes: true,
});

const ZMembershipStaffDTO = ZMembership.omit({
    createdAt: true,
});

type Membership = z.infer<typeof ZMembership>;
type MembershipDTO = z.infer<typeof ZMembershipDTO>;

export { ZMembership, ZMembershipDTO, ZMembershipStaffDTO };
export type { Membership, MembershipDTO };
