import { ZInvoiceDTO } from "@libs/types/invoice.type";
import { z } from "zod";

export const ZInvoiceListResponse = z.object({ invoices: ZInvoiceDTO.array() });

export type InvoiceListResponse = z.infer<typeof ZInvoiceListResponse>;
