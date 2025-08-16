import Link from "next/link";

import { Button } from "@/components/button/Button";

import { InvoiceTable } from "./components/InvoiceTable";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function InvoicePage() {
    return (
        <div className="flex grow items-center justify-center">
            <div className="flex w-full flex-col gap-6">
                <div className="flex justify-between">
                    <h1 className="text-4xl">Invoices</h1>
                    <Button className="w-fit" variant={{ style: "solid" }}>
                        <span>Generate transcript</span>
                    </Button>
                </div>

                <InvoiceTable />

                <div className="text-center text-sm text-gray-400">
                    Have a question? email{" "}
                    <Link className="text-[#978FFE] underline" href="mailto:esports@wdcc.co.nz">
                        esports@wdcc.co.nz
                    </Link>
                </div>
            </div>
        </div>
    );
}

const InvoiceTableHeading = () => (
    <thead className="bg-opacity-50 bg-muted-background border-border border text-white">
        <tr className="*:px-4 *:py-2">
            <th>Period</th>
            <th>Type</th>
            <th>Method</th>
            <th>Status</th>
            <th>Total</th>
            <th className="text-right">Action</th>
        </tr>
    </thead>
);
