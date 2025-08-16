import { TestInvoicesType } from "../types/TestInvoicesType";

export const TestInvoices: TestInvoicesType[] = [
    {
        period: "04/02/2024",
        type: "Membership",
        method: "Stripe",
        status: "Paid",
        total: "$15 NZD",
    },
    {
        period: "12/03/2024",
        type: "Tournament pass",
        method: "Bank transfer",
        status: "Paid",
        total: "$10 NZD",
    },
];
