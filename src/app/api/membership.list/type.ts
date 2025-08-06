import { ZMembershipDTO } from "@libs/types/membership.type";
import { z } from "zod";

export const ZStatus = z.enum(["active", "expired"]);

export const ZMembershipListRouteRequest = z.object({
    userId: z.string(),
    status: ZStatus.optional(),
});

export const ZMembershipListRouteResponse = ZMembershipDTO.extend({
    startAt: z.date(),
    endAt: z.date(),
    status: ZStatus,
});

export type MembershipListRouteResponse = z.infer<typeof ZMembershipListRouteResponse>;
