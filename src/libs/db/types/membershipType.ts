import { z } from "zod/v4";

/**
 * Zod schema for the `membership_types` table
 * use to validate an object
 */

export const ZMembershipType = z.object({
    // TODO: switch id to uuid in the future
    id: z.string(),
    name: z.string().min(1),
    description: z.string().optional(),
    startAt: z.date(),
    endAt: z.date(),
    price: z.coerce.number(),
    isActive: z.boolean(),
    updateAt: z.date(),
    createdAt: z.date(),
});
