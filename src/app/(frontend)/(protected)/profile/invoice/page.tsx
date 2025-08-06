"use client";

import { Button } from "@/components/button/Button";

import { useProfile } from "../components/ProfileProvider";
import { InvoiceRow } from "./components/InvoiceRow";
import { TestInvoices } from "./data/TestInvoices";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function InvoicePage() {
    const profile = useProfile();

    return (
        <div className="flex items-center justify-center">
            <div className="flex w-full max-w-[752px] flex-col gap-6">
                <div className="flex justify-between">
                    <h1 className="font-tomorrow text-4xl">Invoices</h1>
                    <Button className="h-10 w-fit" variant={{ style: "solid" }}>
                        <span>Generate transcript</span>
                    </Button>
                </div>
                <div className="bg-gray h-[1px]"></div>

                <div className="overflow-auto rounded-lg">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-opacity-50 bg-[#978FFE] text-white">
                            <tr>
                                <th className="px-4 py-2">Period</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Method</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 border border-gray-800">
                            {TestInvoices.map((invoice, index) => (
                                <InvoiceRow key={index} invoice={invoice} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Have a question? email{" "}
                    <a className="text-[#978FFE] underline" href="mailto:esports@wdcc.co.nz">
                        esports@wdcc.co.nz
                    </a>
                </div>
            </div>
        </div>
    );
}
