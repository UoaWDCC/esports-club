"use client";

import { useProfile } from "./components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function ProfilePage() {
    const profile = useProfile();

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Profile page</h1>
            <p>{JSON.stringify(profile, null, 2)}</p>
        </div>
    );
}
