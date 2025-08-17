import { ZProfile } from "@libs/types/profile.type";
import { z } from "zod";

export const ZProfileColumns = ZProfile.keyof();
export const ZMemberOrdering = z.object({
    column: ZProfile.keyof(),
    descending: z.boolean().default(true),
});

export const ZMemberListResponse = z.object({
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

export const ZMemberListRequest = z.object({
    page: z.number().int().default(1),
    limit: z.number().int().default(50),
    ordering: ZMemberOrdering.optional().default({
        column: "firstName",
        descending: true,
    }),
});

export type MemberList = z.infer<typeof ZMemberListResponse>;
export type MemberOrdering = z.infer<typeof ZMemberOrdering>;
export type ProfileColumns = z.infer<typeof ZProfileColumns>;
