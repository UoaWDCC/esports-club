"use client";

import Link from "next/link";

import BlockNavigation from "@/components/BlockNavigation";

import { useProfile } from "./components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function ProfilePage() {
    const profile = useProfile();

    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-4xl">Profile</h1>
            <div className="grid grid-cols-3 gap-3">
                <BlockNavigation href="/profile/membership">Membership</BlockNavigation>
                <BlockNavigation href="/profile/invoice">Invoice</BlockNavigation>
            </div>
            <p>{JSON.stringify(profile, null, 2)}</p>
        </div>
    );
}
