import { z } from "zod";

/**
 * Zod schema for the `membership_types` table
 * use to validate an object
 */

const ZMembershipType = z.object({
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

/**
 * data transfer object for the `membership_types` table
 */
const ZMembershipTypeDTO = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    startAt: z.date(),
    endAt: z.date(),
    price: z.coerce.number(),
    isActive: z.boolean(),
});

type MembershipType = z.infer<typeof ZMembershipType>;
type MembershipTypeDTO = z.infer<typeof ZMembershipTypeDTO>;

export { ZMembershipType, ZMembershipTypeDTO };
export type { MembershipType, MembershipTypeDTO };
