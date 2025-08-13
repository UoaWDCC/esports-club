"use client";

import Link from "next/link";

import { Button } from "@/components/button/Button";

import { useProfile } from "../components/ProfileProvider";
import { InvoiceRow } from "./components/InvoiceRow";
import { TestInvoices } from "./data/TestInvoices";

import { useInvoiceListQuery } from "@/app/api/invoices.list/query"

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function InvoicePage() {
    const profile = useProfile();

    const {data, isLoading} = useInvoiceListQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data?.data) return


    return (
        <div className="flex items-center justify-center">
            <div className="flex w-full flex-col gap-6">
                <div className="flex justify-between">
                    <h1 className="font-tomorrow text-4xl">Invoices</h1>
                    <Button className="w-fit" variant={{ style: "solid" }}>
                        <span>Generate transcript</span>
                    </Button>
                </div>
                <br className="border-gray w-dvw" />

                <div className="overflow-auto rounded-lg">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-opacity-50 bg-[#978FFE] text-white">
                            <tr className="*:px-4 *:py-2">
                                <th>Period</th>
                                <th>Type</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 border border-gray-800">
                            {data.data.map((invoice, index) => (
                                <InvoiceRow key={index} invoice={invoice} />
                            ))}
                        </tbody>
                    </table>
                </div>

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
