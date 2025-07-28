"use client";

import { Button } from "@/components/button/Button";
import { approveMembership } from "@/services/membership/approveMembership";

export default function MemberApprovalButton({ membershipID }: { membershipID: string }) {
    const handleApprove = async () => {
        await approveMembership(membershipID);
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
