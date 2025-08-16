"use client";

import { profileNavigation } from "@libs/routes/profile";

import BlockNavigation from "@/components/BlockNavigation";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function ProfilePage() {
    const allLinks = profileNavigation
        .filter((g) => !g.config?.staffOnly)
        .flatMap((group) => group.links ?? [])
        .filter((r) => !(r.notImplemented || r.name === "Dashboard"));

    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-4xl">Profile</h1>
            <div className="grid grid-cols-3 gap-3">
                {allLinks.map((r) => (
                    <BlockNavigation key={r.name} href={r.href}>
                        {r.name}
                    </BlockNavigation>
                ))}
            </div>
        </div>
    );
}
