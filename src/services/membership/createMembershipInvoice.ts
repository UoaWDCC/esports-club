import { db } from "@libs/db";
import { Invoice, InvoiceDTO, PaymentMethod } from "@libs/types/invoice.type";
import { invoices, memberships, membershipTypes, profiles } from "@schema";
import { and, eq } from "drizzle-orm";

export type createMembershipInvoiceType = {
    membershipID: string;
    paidDate?: Date;
    payment_method?: PaymentMethod;
};
export default async function createMembershipInvoice({
    membershipID,
    paidDate = new Date(),
    payment_method = "Stripe",
}: createMembershipInvoiceType) {
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
            paidDate: paidDate,
            price: profileData.price,
            paymentMethod: payment_method,
        };
        const result = await db.insert(invoices).values(newInvoice).returning();
        invoice = result[0];
        await db.update(memberships).set({ invoiceId: invoice.id });
    } else {
        const result = await db
            .update(invoices)
            .set({ status: "paid", paidDate: paidDate, paymentMethod: payment_method })
            .where(eq(invoices.id, profileData.invoiceID))
            .returning();
        invoice = result[0];
    }

    return invoice;
}
