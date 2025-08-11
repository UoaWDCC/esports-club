import { PAYMENT_METHODS } from "@libs/types/invoice.type";
import { z } from "zod";

export const ZMembershipApproveRouteRequest = z.object({
    membershipId: z.string(),
    paidDate: z.date().optional(),
    paymentMethod: z.enum(PAYMENT_METHODS).optional(),
});

export type MembershipApproveRouteRequest = z.infer<typeof ZMembershipApproveRouteRequest>;
