import { ZMembership, ZStatusOptions } from "@libs/types/membership.type";
import { z } from "zod";

export const ZStateOptions = z.enum(["active", "expired"]);

export const ZMembershipListRouteRequest = z.object({
    userId: z.string(),
    state: ZStateOptions.optional(),
    status: ZStatusOptions.optional(),
});

export const ZMembershipListRouteResponse = ZMembership.extend({
    description: z.string(),
    startAt: z.date(),
    endAt: z.date(),
    status: ZStatusOptions,
    state: ZStateOptions,
    price: z.number(),
    title: z.string(),
});

export type MembershipListRouteResponse = z.infer<typeof ZMembershipListRouteResponse>;
export type Status = z.infer<typeof ZStateOptions>;
