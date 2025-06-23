import "dotenv/config";

import { InvoiceDTO } from "@libs/types/invoice.type";
import { MembershipDTO } from "@libs/types/membership.type";
import { invoices, memberships } from "@schema";

import { db } from "..";

/**
 * seeds membershipType
 * usage tsx '.\src\libs\db\seed\membership.seed.ts'
 */

async function seedMembership() {
    const existingProfileId = "16d722a8-fc8b-4cc6-a816-2abfbe67151b";
    const existingMembershipTypeId = "9670729f-95e5-4145-99e1-d368378191f2";

    const newInvoice: InvoiceDTO = {
        profileId: existingProfileId,
        type: "membership",
        paymentMethod: "Stripe",
        description: "a membership wowow",
        status: "paid",
        price: 9999,
        paidDate: new Date(),
    };

    const invoiceId = (await db.insert(invoices).values(newInvoice).returning().execute())[0].id;

    const newMembership: MembershipDTO = {
        profileId: existingProfileId,
        invoiceId: invoiceId,
        membershipTypeId: existingMembershipTypeId,
        isPaid: true,
    };

    const result = await db.insert(memberships).values(newMembership).returning().execute();

    console.log(`Inserted a new membership of id: ${result[0].id}`);
}

seedMembership()
    .then(() => {
        console.log("Seeding a membership completed!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error seeding a membership:", err);
        process.exit(1);
    });
