import { db } from "@libs/db";
import { Invoice, InvoiceDTO } from "@libs/types/invoice.type";
import { invoices, memberships, membershipTypes, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

export default async function createMembershipInvoice(membershipID: string) {
    const data = await db
        .select({
            profileID: profiles.id,
            price: membershipTypes.price,
            invoiceID: invoices.id,
        })
        .from(profiles)
        .innerJoin(
            memberships,
            and(eq(memberships.id, membershipID), eq(profiles.id, memberships.profileId)),
        )
        .innerJoin(membershipTypes, and(eq(membershipTypes.id, memberships.membershipTypeId)))
        .leftJoin(invoices, and(memberships.invoiceId, invoices.id));

    if (data.length < 1) {
        console.log(
            "Error with Membership Invoice Creation - Membership does not have a valid MembershipType",
        );
    }

    const profileData = data[0];
    let invoice: Invoice;
    if (profileData.invoiceID == null) {
        const newInvoice: InvoiceDTO = {
            profileId: profileData.profileID,
            type: "membership",
            status: "paid",
            paidDate: new Date(),
            price: profileData.price,
            paymentMethod: "bank_transfer",
        };
        const result = await db.insert(invoices).values(newInvoice).returning();
        invoice = result[0];
        await db.update(memberships).set({ invoiceId: invoice.id });
    } else {
        const result = await db
            .update(invoices)
            .set({ status: "paid", paidDate: new Date(), paymentMethod: "bank_transfer" })
            .where(eq(invoices.id, profileData.invoiceID))
            .returning();
        invoice = result[0];
    }

    return invoice;
}
