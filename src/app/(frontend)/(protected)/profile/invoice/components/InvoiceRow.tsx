import Link from "next/link";

import { InvoiceListResponse } from "@/app/api/invoices.list/type";

export function InvoiceRow({ invoice }: { invoice: InvoiceListResponse["invoices"][0] }) {
    return (
        <tr>
            <td>{new Date(invoice.paidDate).toDateString()}</td>
            <td>{invoice.type}</td>
            <td>{invoice.paymentMethod}</td>
            <td>{invoice.status}</td>
            <td>{invoice.price}</td>
            <td className="text-right">
                <Link href="#" className="text-[#978FFE] hover:underline">
                    View →
                </Link>
            </td>
        </tr>
    );
}
