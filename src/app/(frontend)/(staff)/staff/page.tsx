import { staffNavigation } from "@libs/routes/staff";

import BlockNavigation from "@/components/BlockNavigation";

export default async function StaffPage() {
    const allLinks = staffNavigation
        .filter((g) => !(g.config?.staffOnly || g.label === "Profile"))
        .flatMap((group) => group.links ?? [])
        .filter((r) => !(r.notImplemented || r.name === "Dashboard"));

    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-4xl">Staff</h1>
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
