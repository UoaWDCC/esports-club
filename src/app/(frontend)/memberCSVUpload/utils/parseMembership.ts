/**
 * PRASING FUNCTION ONLY FOR THE 2025 CSV
 */

import { PaymentMethod } from "@libs/types/invoice.type";

export const parseMembership = (
    raw: string[],
): { paymentMethod: PaymentMethod; membershipTypeId: string; hasPaid: boolean } => {
    let paymentMethod = raw[1];
    let membership = raw[2];
    console.log(membership);
    // there is two column in the csv for has paid??
    // const hasPaid = raw[4] === "Yes";

    const oneSemesterMemberhsipTypeId = "1082919f-18db-4fcf-b8d5-f62617c84945";
    const fullYearMemberhsipTypeId = "84814ab3-5201-467d-becd-ed96f8162427";

    if (paymentMethod === "Online Banking") {
        paymentMethod = "bank_transfer" as PaymentMethod;
    } else if (paymentMethod === "IRL") {
        paymentMethod = "In_person" as PaymentMethod;
    }

    if (membership.trim() === "Full Year") {
        membership = fullYearMemberhsipTypeId;
    } else if (membership.trim() === "One Semester") {
        membership = oneSemesterMemberhsipTypeId;
    } else {
        membership = "null";
    }

    return {
        paymentMethod: paymentMethod as PaymentMethod,
        membershipTypeId: membership,
        hasPaid: true,
    };
};
