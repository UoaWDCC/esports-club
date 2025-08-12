"use client";

import { useMembershipListQuery } from "@/app/api/membership.list/query";
import { MembershipListRouteResponse } from "@/app/api/membership.list/type";
import { Button } from "@/components/button/Button";

import { MembershipCard } from "./components/MembershipCard";
import { MembershipInfoRow } from "./components/MembershipInfoRow";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function MembershipPage() {
    const { data: memberships, isLoading } = useMembershipListQuery();

    if (isLoading) {
        return <div> IsLoading</div>;
    }
    if (!memberships) {
        return <div>No Data</div>;
    }
    const active_membership: MembershipListRouteResponse | null =
        memberships.find((e) => e.state == "active") ?? memberships[0];

    return (
        <div className="flex items-center justify-center">
            <div className="mb-24 flex w-full max-w-5xl flex-col gap-6">
                <h1 className="font-tomorrow text-4xl">Membership</h1>
                <hr className="border-gray" />
                <div className="flex flex-col gap-2">
                    <h2 className="font-tomorrow text-xl text-[#978FFE]">Membership status</h2>
                    <p className="text-sm">Your membership status</p>
                </div>
                <MembershipInfoRow
                    title="Membership type"
                    info={active_membership?.title ?? "No Previous Memberships"}
                />
                <MembershipInfoRow
                    title="Status"
                    info={active_membership?.state ?? "No Previous Memberships"}
                />
                <MembershipInfoRow
                    title="Expiry Date"
                    info={active_membership?.endAt.toDateString() ?? "No Previous Memberships"}
                />
                <div className="flex justify-end gap-2">
                    <Button variant={{ style: "solid" }}>
                        <span>See advance details</span>
                    </Button>
                    <Button variant={{ style: "cta" }}>
                        <span>Scan in code</span>
                    </Button>
                </div>
                <hr className="border-gray" />
                <div className="flex flex-col gap-2">
                    <div className="font-tomorrow flex gap-2 text-xl">
                        <p className="text-[#978FFE]">All membership(s)</p>
                        <p>({memberships.length})</p>
                    </div>
                    <p className="text-sm">Your membership status</p>
                </div>
                {memberships.map((membership) => (
                    <MembershipCard key={membership.id} membership={membership} />
                ))}
            </div>
        </div>
    );
}
