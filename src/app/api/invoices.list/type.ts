import { ZProfileDTO } from "@libs/types/profile.type";
import { z } from "zod";

export const ZInvoiceListResponse = ZProfileDTO.array();

export type InvoiceListResponse = z.infer<typeof ZInvoiceListResponse>;
