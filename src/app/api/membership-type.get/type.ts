import { z } from "zod";

/**
 * @param ms_id membership type id
 */
export const ZMembershipTypeRequest = z.object({
    ms_id: z.string().min(1),
});

export type MembershipTypeRequest = z.infer<typeof ZMembershipTypeRequest>;
