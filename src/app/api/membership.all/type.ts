import { ZMembershipStaffDTO, ZStatusOptions } from "@libs/types/membership.type";
import { z } from "zod";

export const ZState = z.enum(["active", "expired"]);

export const ZMembershipAllRouteRequest = z.object({
    state: ZState.optional(),
    status: ZStatusOptions.optional(),
});

export const ZMembershipAllRouteResponse = z.object({
    memberships: ZMembershipStaffDTO.extend({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        startAt: z.coerce.date(),
        endAt: z.coerce.date(),
        state: ZState,
    }).array(),
});
export type MembershipAllRequest = z.infer<typeof ZMembershipAllRouteRequest>;
export type MembershipAll = z.infer<typeof ZMembershipAllRouteResponse>;
