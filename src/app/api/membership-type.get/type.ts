import { z } from "zod";

export const ZMembershipTypeRequest = z.object({
    id: z.string().min(1),
});
