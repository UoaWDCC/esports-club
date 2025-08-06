import { Invoice } from "../data/TestInvoices";

export function InvoiceRow({ invoice }: { invoice: Invoice }) {
    return (
        <tr className="transition hover:bg-gray-900">
            <td className="px-4 py-2">{invoice.period}</td>
            <td className="px-4 py-2">{invoice.type}</td>
            <td className="px-4 py-2">{invoice.method}</td>
            <td className="px-4 py-2">{invoice.status}</td>
            <td className="px-4 py-2">{invoice.total}</td>
            <td className="px-4 py-2 text-right">
                <a href="#" className="text-[#978FFE] hover:underline">
                    View →
                </a>
            </td>
        </tr>
    );
}
