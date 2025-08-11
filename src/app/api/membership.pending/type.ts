import { ZMembershipDTO } from "@libs/types/membership.type";
import { z } from "zod";

export const ZMembershipPendingRouteResponse = ZMembershipDTO.extend({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
});

export type MembershipPendingRouteResponse = z.infer<typeof ZMembershipPendingRouteResponse>;
