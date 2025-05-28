import { z } from "zod/v4";

/**
 * Zod schema for the `memberships` table
 * use to validate an object
 */

export const ZMembership = z.object({
    // TODO: switch id, profileId, invoiceId, and membershipTypeId to uuid in the future
    id: z.string(),
    profileId: z.string(),
    invoiceId: z.string(),
    membershipTypeId: z.string(),
    isPaid: z.boolean(),
    createdAt: z.date(),
});

export type MembershipType = z.infer<typeof ZMembership>;
