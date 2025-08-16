import { z } from "zod";

/**
 * @param includeInactive whether to include inactive membership types
 */
export const ZMembershipTypeListRequest = z.object({
    includeInactive: z.boolean().default(false),
});

export type MembershipTypeListRequest = z.infer<typeof ZMembershipTypeListRequest>;
