import { title } from "process";
import { ZMembership, ZMembershipDTO } from "@libs/types/membership.type";
import { z } from "zod";

export const ZStatus = z.enum(["active", "expired"]);

export const ZMembershipListRouteRequest = z.object({
    userId: z.string(),
    status: ZStatus.optional(),
});

export const ZMembershipListRouteResponse = ZMembership.extend({
    description: z.string(),
    startAt: z.date(),
    endAt: z.date(),
    status: ZStatus,
    price: z.number(),
    title: z.string(),
});

export type MembershipListRouteResponse = z.infer<typeof ZMembershipListRouteResponse>;
export type Status = z.infer<typeof ZStatus>;
