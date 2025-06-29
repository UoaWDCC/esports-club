"use client";

import { useProfile } from "../components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function MembershipPage() {
    const profile = useProfile();

    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-3xl">Memberships</h1>
            <p>{JSON.stringify(profile, null, 2)}</p>
        </div>
    );
}
