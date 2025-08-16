"use client";

import { useInvoiceListQuery } from "@/app/api/invoices.list/query";

import { InvoiceRow } from "./InvoiceRow";

export const InvoiceList = () => {
    const { data, error, isLoading, isError } = useInvoiceListQuery();

    if (isLoading) {
        return (
            <tr>
                <td>Loading...</td>
            </tr>
        );
    }

    if (isError) {
        return (
            <tr>
                <td>{error.message}</td>
            </tr>
        );
    }

    if (!data) {
        return (
            <tr>
                <td>No data</td>
            </tr>
        );
    }

    const { invoices } = data;

    return invoices.map((invoice, index) => <InvoiceRow key={index} invoice={invoice} />);
};
