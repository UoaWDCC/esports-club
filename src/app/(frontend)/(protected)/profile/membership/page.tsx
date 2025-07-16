"use client";

import { Button } from "@/components/button/Button";

import { MembershipCard } from "./components/MembershipCard";
import { MembershipInfoRow } from "./components/MembershipInfoRow";
import { TestMemberships } from "./data/TestMemberships";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function MembershipPage() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-full max-w-[752px] flex-col gap-6">
                <h1 className="font-tomorrow text-4xl">Membership</h1>
                <div className="bg-gray h-[1px]"></div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-tomorrow text-xl text-[#978FFE]">Membership status</h2>
                    <p className="text-sm">Your membership status</p>
                </div>
                <MembershipInfoRow title="Membership type" info="Full year membership" />
                <MembershipInfoRow title="Status" info="Active membership" />
                <MembershipInfoRow title="Expiry Date" info="29/12/2025" />
                <div className="flex justify-end gap-2">
                    <Button className="h-12 w-[238px]" variant={{ style: "solid" }}>
                        <span>See advance details</span>
                    </Button>
                    <Button className="h-12 w-[238px]" variant={{ style: "cta" }}>
                        <span>Scan in code</span>
                    </Button>
                </div>
                <div className="bg-gray h-[1px]"></div>
                <div className="flex flex-col gap-2">
                    <div className="font-tomorrow flex gap-2">
                        <h2 className="text-xl text-[#978FFE]">All membership(s)</h2>
                        <h2 className="text-xl">({TestMemberships.length})</h2>
                    </div>
                    <p className="text-sm">Your membership status</p>
                </div>
                {TestMemberships.map((membership, index) => (
                    <MembershipCard membership={membership} key={index} />
                ))}
            </div>
        </div>
    );
}
