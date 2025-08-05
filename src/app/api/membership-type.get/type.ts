import { z } from "zod";

/**
 * @param ms_id membership type id
 */
export const ZMembershipTypeRequest = z.object({
    ms_id: z.string().min(1),
});
