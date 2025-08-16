import React from "react";

import { Table } from "@/components/table";

import { InvoiceList } from "./InvoiceList";

export const InvoiceTable = () => {
    return (
        <Table.Root>
            <InvoiceTableHeading />
            <Table.Body>
                <InvoiceList />
            </Table.Body>
        </Table.Root>
    );
};

const InvoiceTableHeading = () => (
    <Table.Heading>
        <th>Period</th>
        <th>Type</th>
        <th>Method</th>
        <th>Status</th>
        <th>Total</th>
        <th className="text-right">Action</th>
    </Table.Heading>
);
