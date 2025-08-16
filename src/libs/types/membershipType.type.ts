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
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
    price: z.coerce.number(),
    isActive: z.boolean(),
    updateAt: z.coerce.date(),
    createdAt: z.coerce.date(),
});

const ZMembershipTypeDTO = ZMembershipType.omit({
    id: true,
    isActive: true,
    updateAt: true,
    createdAt: true,
});

type MembershipType = z.infer<typeof ZMembershipType>;
type MembershipTypeDTO = z.infer<typeof ZMembershipTypeDTO>;

export { ZMembershipType, ZMembershipTypeDTO };
export type { MembershipType, MembershipTypeDTO };
