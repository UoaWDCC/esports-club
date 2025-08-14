"use server";

import { db } from "@libs/db";
import { membershipTypes } from "@libs/db/schema";

export const getAllMembershipTypes = async (limit: number = Infinity, page: number = 1) => {
    if (!limit || !page) {
        throw new Error("Invalid limit or page");
    }

    if (limit < 1 || page < 1) {
        throw new Error("Invalid limit or page");
    }

    const membershipTypesList = await db
        .select()
        .from(membershipTypes)
        .offset(limit * (page - 1))
        .limit(limit);

    return membershipTypesList;
};
