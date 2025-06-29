"use client";

import Link from "next/link";

import { useProfile } from "./components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function ProfilePage() {
    const profile = useProfile();

    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-3xl">Profile</h1>
            <div className="grid grid-cols-3 gap-3">
                <Link
                    href="profile/membership"
                    className="h-36 w-full rounded bg-neutral-800 p-3 hover:bg-neutral-700"
                >
                    Membership
                </Link>
                <Link
                    href="profile/invoice"
                    className="h-36 w-full rounded bg-neutral-800 p-3 hover:bg-neutral-700"
                >
                    Invoices
                </Link>
            </div>
            <p>{JSON.stringify(profile, null, 2)}</p>
        </div>
    );
}
