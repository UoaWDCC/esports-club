import { ZProfile } from "@libs/types/profile.type";
import { z } from "zod";

export const ZMemberAllGetResponse = ZProfile.array();

export type MemberAllResponse = z.infer<typeof ZMemberAllGetResponse>;

export const ZMemberAllPostResponse = ZProfile.array();

export type MemberAllPostResponse = z.infer<typeof ZMemberAllPostResponse>;
