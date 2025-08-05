import { ZProfileDTO } from "@libs/types/profile.type";
import { z } from "zod";

export const ZProfileUpdateRequest = ZProfileDTO;

export type ProfileUpdateRequest = z.infer<typeof ZProfileUpdateRequest>;
