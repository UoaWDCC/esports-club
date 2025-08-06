"use server";

import { unstable_cache } from "next/cache";
import { db } from "@libs/db";
import { invoices, memberships, membershipTypes, profiles } from "@libs/db/schema";
import { InvoiceDTO } from "@libs/types/invoice.type";
import { MembershipDTO } from "@libs/types/membership.type";
import { eq } from "drizzle-orm";

import { validateProfile } from "@/services/profile/validateProfile";

import { MemberData } from "../components/CSVReader";

function getMembershipType(id: string) {
    return unstable_cache(
        async () => {
            return (await db.select().from(membershipTypes).where(eq(membershipTypes.id, id)))[0];
        },
        ["membershipType", id],
        {
            tags: ["membershipType"],
            revalidate: 600,
        },
    )();
}

/**
 * given a member data, generate a profile and membership
 */

export const generateMemberProfile = async (data: MemberData) => {
    const { membership, profile } = data;
    const { membershipTypeId, paymentMethod } = membership;

    const result = validateProfile(profile);
    if (result.error) return;

    const membershipType = await getMembershipType(membershipTypeId);
    if (!membershipType) return;

    const profileData = (await db.insert(profiles).values(profile).returning().execute())[0];

    const newInvoice: InvoiceDTO = {
        profileId: profileData.id,
        type: "membership",
        paymentMethod: paymentMethod,
        description: membershipType.description || "",
        status: "paid",
        price: membershipType.price,
        paidDate: new Date(),
    };
    const invoiceData = (await db.insert(invoices).values(newInvoice).returning().execute())[0];

    const newMembership: MembershipDTO = {
        profileId: profileData.id,
        invoiceId: invoiceData.id,
        membershipTypeId: membershipTypeId,
        status: "approved",
    };

    const finalMembership = await db
        .insert(memberships)
        .values(newMembership)
        .returning()
        .execute();

    console.log(`Inserted a new membership of id: ${finalMembership[0].id}`);
};
