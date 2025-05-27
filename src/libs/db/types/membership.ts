import { z } from "zod/v4";

/**
 * Zod schema for the `memberships` table
 * use to validate an object
 */

export const ZMembership = z.object({
    id: z.uuid(),
    profileId: z.uuid(),
    invoiceId: z.uuid(),
    membershipTypeId: z.uuid(),
    isPaid: z.boolean(),
    createdAt: z.date(),
});
