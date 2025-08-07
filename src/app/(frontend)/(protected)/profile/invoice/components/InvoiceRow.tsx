import Link from "next/link";

import { TestInvoicesType } from "../types/TestInvoicesType";

export function InvoiceRow({ invoice }: { invoice: TestInvoicesType }) {
    return (
        <tr className="transition *:px-4 *:py-2 hover:bg-gray-900">
            <td>{invoice.period}</td>
            <td>{invoice.type}</td>
            <td>{invoice.method}</td>
            <td>{invoice.status}</td>
            <td>{invoice.total}</td>
            <td className="text-right">
                <Link href="#" className="text-[#978FFE] hover:underline">
                    View →
                </Link>
            </td>
        </tr>
    );
}
