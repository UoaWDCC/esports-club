/**
 * PRASING FUNCTION ONLY FOR THE 2025 CSV
 */

import { PaymentMethod } from "@libs/types/invoice.type";

export const parseMembership = (
    raw: string[],
): { paymentMethod: PaymentMethod; membershipTypeId: string; hasPaid: boolean } => {
    let paymentMethod = raw[1];
    let membership = raw[2];
    // there is two column in the csv for has paid??
    // const hasPaid = raw[4] === "Yes";

    const oneSemesterMemberhsipTypeId = "1082919f-18db-4fcf-b8d5-f62617c84945";
    const fullYearMemberhsipTypeId = "84814ab3-5201-467d-becd-ed96f8162427";

    switch (paymentMethod) {
        case "Online Banking": {
            paymentMethod = "bank_transfer" as PaymentMethod;
        }
        case "IRL": {
            paymentMethod = "In_person" as PaymentMethod;
        }
    }

    switch (membership) {
        case "Full Year": {
            membership = fullYearMemberhsipTypeId;
        }
        case "One Semester": {
            membership = oneSemesterMemberhsipTypeId;
        }
        default: {
            membership = "null";
        }
    }

    return {
        paymentMethod: paymentMethod as PaymentMethod,
        membershipTypeId: membership,
        hasPaid: true,
    };
};
