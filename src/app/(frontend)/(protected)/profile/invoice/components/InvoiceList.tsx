"use client";

import { useInvoiceListQuery } from "@/app/api/invoices.list/query";

import { InvoiceRow } from "./InvoiceRow";

export const InvoiceList = () => {
    const { data, error, isLoading, isError } = useInvoiceListQuery();

    if (isLoading) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    Loading...
                </td>
            </tr>
        );
    }

    if (isError) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    {error.message}
                </td>
            </tr>
        );
    }

    if (!data) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    No data
                </td>
            </tr>
        );
    }

    const { invoices } = data;

    return invoices.map((invoice, index) => <InvoiceRow key={index} invoice={invoice} />);
};
