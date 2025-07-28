"use client";

import { useState } from "react";

import { Button } from "@/components/button/Button";
import { rejectMembership } from "@/services/membership/rejectMembership";

export default function MemberRejectionButton({ membershipID }: { membershipID: string }) {
    const [reason, setReason] = useState<string>("");

    const handleRejection = async () => {
        await rejectMembership(membershipID, reason);
    };

    return (
        <span>
            <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Insert Rejection Reason Here"
            ></input>
            <Button
                onClick={() => {
                    handleRejection();
                }}
            >
                Reject
            </Button>
        </span>
    );
}
