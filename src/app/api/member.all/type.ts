import { ZProfile } from "@libs/types/profile.type";
import { z } from "zod";

export const ZMemberResponse = ZProfile;

export type MemberResponse = z.infer<typeof ZMemberResponse>;
