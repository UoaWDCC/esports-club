import { ZProfile } from "@libs/types/profile.type";
import { z } from "zod";

export const ZMemberResponse = z.object({
    members: ZProfile.array(),
    pagination: z
        .object({
            totalItems: z.number().int(),
            currentPage: z.number().int().optional(),
            totalPage: z.number().int().optional(),
            limit: z.number().int().optional(),
        })
        .optional(),
});

export type MemberResponse = z.infer<typeof ZMemberResponse>;
