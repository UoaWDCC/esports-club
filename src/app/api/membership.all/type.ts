import { ZMembershipDTO } from "@libs/types/membership.type";
import { z } from "zod";

export const ZStatus = z.enum(["active", "expired"]);

export const ZMembershipAllRouteRequest = z.object({
    status: ZStatus.optional(),
});

export const ZMembershipAllRouteResponse = ZMembershipDTO.extend({
    startAt: z.date(),
    endAt: z.date(),
    status: ZStatus,
});

export type MembershipAllRouteResponse = z.infer<typeof ZMembershipAllRouteResponse>;
