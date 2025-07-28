import { z } from "zod/v4";

const INVOICE_TYPES = ["tournament_pass", "membership", "other"] as const;
const PAYMENT_STATUSES = ["cancelled", "pending", "paid"] as const;
const PAYMENT_METHODS = ["bank_transfer", "Stripe", "In_person"] as const;

type InvoiceType = (typeof INVOICE_TYPES)[number];
type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
type PaymentMethod = (typeof PAYMENT_METHODS)[number];

/**
 * Zod schema for the `invoices` table
 * use to validate an object
 */

const ZInvoice = z.object({
    // TODO: switch id, and profileId to uuid in the future
    id: z.string(),
    profileId: z.string().nullable(),
    type: z.enum(INVOICE_TYPES),
    description: z.string().nullable(),
    status: z.enum(PAYMENT_STATUSES),
    paidDate: z.date(),
    paymentMethod: z.enum(PAYMENT_METHODS),
    price: z.number(),
    createdAt: z.date(),
});

/**
 * data transfer object for the `invoices` table
 */
const ZInvoiceDTO = z.object({
    // TODO: switch id to uuid in the future
    profileId: z.string(),
    type: z.enum(INVOICE_TYPES),
    description: z.string().optional(),
    status: z.enum(PAYMENT_STATUSES),
    paidDate: z.date(),
    paymentMethod: z.enum(PAYMENT_METHODS),
    price: z.number(),
});

type Invoice = z.infer<typeof ZInvoice>;
type InvoiceDTO = z.infer<typeof ZInvoiceDTO>;

export { ZInvoice, ZInvoiceDTO, INVOICE_TYPES, PAYMENT_STATUSES, PAYMENT_METHODS };
export type { Invoice, InvoiceDTO, InvoiceType, PaymentStatus, PaymentMethod };
