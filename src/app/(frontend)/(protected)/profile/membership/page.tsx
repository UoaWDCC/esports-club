"use client";

import { Button } from "@/components/button/Button";
import { useProfile } from "../components/ProfileProvider";
import { useState } from "react";
import { cn } from "@libs/utils";
import { TestMembershipType } from "./types/TestMembershipType";
import { TestMemberships } from "./data/TestMemberships";
import { MembershipCard } from "./components/MembershipCard";
import { MembershipInfoRow } from "./components/MembershipInfoRow";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function MembershipPage() {
    const profile = useProfile();

    

    return (
        <div className="flex flex-col gap-6 w-fit">
            <h1 className="text-4xl font-tomorrow">Membership</h1>
            <div className="bg-gray h-[1px]"></div>
            <div className="flex flex-col gap-2">
            <h2 className="text-xl text-[#978FFE] font-tomorrow">Membership status</h2>
            <p className="text-sm">Your membership status</p>
            </div>
            <MembershipInfoRow title = "Membership type" info = "Full year membership" />
            <MembershipInfoRow title = "Status" info = "Active membership" />
            <MembershipInfoRow title = "Expiry Date" info = "29/12/2025" />
            <div className="flex justify-end gap-2">
                <Button className="w-[238px] h-12" variant={{ style: "solid" }}><span>See advance details</span></Button>
                <Button className="w-[238px] h-12" variant={{ style: "cta" }}><span>Scan in code</span></Button>
            </div>
            <div className="bg-gray h-[1px]"></div>
            <div className="flex gap-2 font-tomorrow">
            <h2 className="text-xl text-[#978FFE]">All membership(s)</h2>
            <h2 className="text-xl">({TestMemberships.length})</h2>
            </div>
            {TestMemberships.map((membership, index) => (
                <MembershipCard membership={membership} key={index} />
            ))}
        </div>
        
    );
}





