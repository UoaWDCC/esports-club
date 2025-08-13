import Link from "next/link";

import { TestInvoicesType } from "../types/TestInvoicesType";
import { InvoiceListResponse } from "@/app/api/invoices.list/type";

export function InvoiceRow({ invoice }: { invoice: InvoiceListResponse[0]}) {
    return (
        <tr className="transition *:px-4 *:py-2 hover:bg-gray-900">
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
