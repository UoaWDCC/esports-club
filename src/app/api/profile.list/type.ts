import { ZProfile } from "@libs/types/profile.type";
import { z, ZodEnum } from "zod";

export const ProfileColumns = ZProfile.keyof();
export const ProfileOrdering = z.object({
    column: ZProfile.keyof(),
    descending: z.boolean().default(true),
});

export const ZProfileListRequest = z.object({
    p_id: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    university: z.string().optional(),
    email: z.string().optional(),
    ordering: ProfileOrdering.optional(),
});

export const ZProfileListResponse = z.object({
    profiles: ZProfile.array(),
});

export type ProfileListResponse = z.infer<typeof ZProfileListResponse>;
export type ProfileListRequest = z.infer<typeof ZProfileListRequest>;
