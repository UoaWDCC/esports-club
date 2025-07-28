"use client";

import { useState } from "react";

import { Button } from "@/components/button/Button";
import { rejectMembership } from "@/services/membership/rejectMembership";

export default function MemberRejectionButton({
    name,
    email,
    membershipID,
}: {
    name: string;
    email: string;
    membershipID: string;
}) {
    const [reason, setReason] = useState<string>("");

    const handleRejection = async () => {
        const result = await rejectMembership(name, email, membershipID, reason);
        console.log(result);
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
