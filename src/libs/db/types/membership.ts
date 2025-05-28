import { z } from "zod/v4";

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
    isPaid: z.boolean(),
    createdAt: z.date(),
});

/**
 * data transfer object for the `memberships` table
 */
const ZMembershipDTO = z.object({
    profileId: z.string(),
    invoiceId: z.string(),
    membershipTypeId: z.string(),
    isPaid: z.boolean(),
});

type MembershipType = z.infer<typeof ZMembership>;
type MembershipDTOType = z.infer<typeof ZMembershipDTO>;

export { ZMembership, ZMembershipDTO };
export type { MembershipType, MembershipDTOType };
