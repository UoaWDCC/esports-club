import { z } from "zod";

export const ZStatus = z.enum(["active", "expired"]);

export const ZMembershipRejectRouteRequest = z.object({
    membershipId: z.string(),
    reason: z.string(),
});

export type MembershipRejectRouteRequest = z.infer<typeof ZMembershipRejectRouteRequest>;
