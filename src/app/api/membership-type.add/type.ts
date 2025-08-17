import { z } from "zod";

/**
 * @param name membership type name
 * @param description membership type description (optional)
 * @param startAt start date for the membership type
 * @param endAt end date for the membership type
 * @param price price in cents
 * @param isActive whether the membership type is active
 */
export const ZMembershipTypeAddRequest = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        description: z.string().optional(),
        startAt: z
            .string()
            .min(1, { message: "Start date is required" })
            .transform((val) => new Date(val)),
        endAt: z
            .string()
            .min(1, { message: "End date is required" })
            .transform((val) => new Date(val)),
        price: z.number().int().min(0, { message: "Price must be a positive integer" }),
        isActive: z.boolean().default(true),
    })
    .refine((data) => new Date(data.startAt) < new Date(data.endAt), {
        message: "End date must be after start date",
        path: ["endAt"],
    });

export type MembershipTypeAddRequest = z.infer<typeof ZMembershipTypeAddRequest>;
