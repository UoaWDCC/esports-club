import { MembershipTypeDTO } from "@libs/types/membershipType.type";
import { z } from "zod";

export const ZMembershipStatusRouteRequest = z.object({
    userId: z.string(),
});

export type MembershipStatusRouteResponse = MembershipTypeDTO[];
