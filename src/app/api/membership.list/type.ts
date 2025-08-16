import { ZMembership, ZStatusOptions } from "@libs/types/membership.type";
import { z } from "zod";

export const ZStateOptions = z.enum(["active", "expired"]);

export const ZMembershipListRequest = z.object({
    userId: z.string(),
    state: ZStateOptions.optional(),
    status: ZStatusOptions.optional(),
});

export const ZMembershipListResponse = z.object({
    memberships: ZMembership.extend({
        description: z.string(),
        startAt: z.coerce.date(),
        endAt: z.coerce.date(),
        status: ZStatusOptions,
        state: ZStateOptions,
        price: z.number(),
        title: z.string(),
    }).array(),
});

export type MembershipListResponse = z.infer<typeof ZMembershipListResponse>;
export type Status = z.infer<typeof ZStateOptions>;
