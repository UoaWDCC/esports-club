"use client";

import { Button } from "@/components/button/Button";
import { approveMembership } from "@/services/membership/approveMembership";

export default function MemberApprovalButton({
    name,
    email,
    membershipID,
}: {
    name: string;
    email: string;
    membershipID: string;
}) {
    const handleApprove = async () => {
        await approveMembership(name, email, membershipID);
    };

    return (
        <Button
            onClick={() => {
                handleApprove();
            }}
        >
            Approve
        </Button>
    );
}
