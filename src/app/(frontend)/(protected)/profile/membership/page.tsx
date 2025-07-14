"use client";

import { Button } from "@/components/button/Button";
import { useProfile } from "../components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function MembershipPage() {
    const profile = useProfile();

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-4xl">Membership</h1>
            <div className="bg-gray h-[1px]"></div>
            <h2 className="text-xl">Membership status</h2>
            <p className="text-sm">Your membership status</p>
            <MembershipInfoRow title = "Membership type" info = "Full year membership" />
            <MembershipInfoRow title = "Status" info = "Active membership" />
            <MembershipInfoRow title = "Expiry Date" info = "29/12/2025" />
            <div className="flex justify-end gap-2">
                <Button className="w-[238px] h-12" variant={{ style: "solid" }}><span>See advance details</span></Button>
                <Button className="w-[238px] h-12" variant={{ style: "cta" }}><span>Scan in code</span></Button>
            </div>
        </div>
        
    );
}

interface MembershipInfoRowProps {
    title: string;
    info: string;
}

function MembershipInfoRow({title, info} : MembershipInfoRowProps) {
    return (
        <div className="flex flex-row justify-between">
            <p> {title}: </p>
            <p> {info} </p>
        </div>
    );
}
