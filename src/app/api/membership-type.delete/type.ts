import { z } from "zod";

/**
 * @param id membership type id to delete
 */
export const ZMembershipTypeDeleteRequest = z.object({
    id: z.string().min(1, { message: "ID is required" }),
});

export type MembershipTypeDeleteRequest = z.infer<typeof ZMembershipTypeDeleteRequest>;
