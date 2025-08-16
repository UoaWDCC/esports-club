import { z } from "zod";

export const ZMemberCountResponse = z.object({
    totalItems: z.number().int(),
});

export type MemberCount = z.infer<typeof ZMemberCountResponse>;
