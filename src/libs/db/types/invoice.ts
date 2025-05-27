import { z } from "zod/v4";

export const invoiceType = ["tournament_pass", "membership", "other"] as const;
export const statusType = ["cancelled", "pending", "paid"] as const;
export const paymentType = ["bank_transfer", "Stripe", "In_person"] as const;

/**
 * Zod schema for the `invoices` table
 * use to validate an object
 */

export const ZInvoice = z.object({
    // TODO: switch id, and profileId to uuid in the future
    id: z.uuid(),
    profileId: z.uuid(),
    type: z.enum(invoiceType),
    description: z.string().optional(),
    status: z.enum(statusType),
    paidDate: z.date(),
    paymentMethod: z.enum(paymentType),
    price: z.number(),
    createdAt: z.date(),
});
