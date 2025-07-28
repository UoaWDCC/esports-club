"use client";

import { Button } from "@/components/button/Button";
import { resetTestMembership } from "@/services/membership/resetTestMembership";

export default function ResetTestMembershipButton() {
    const handleApprove = async () => {
        const result = await resetTestMembership();
        console.log(result);
    };

    return (
        <Button
            onClick={() => {
                handleApprove();
            }}
        >
            Reset Test Membership
        </Button>
    );
}
