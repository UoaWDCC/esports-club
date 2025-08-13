"use client";

import { useMembershipListQuery } from "@/app/api/membership.list/query";
import { MembershipListResponse } from "@/app/api/membership.list/type";
import LoadingBoundary from "@/components/boundaries/LoadingBoundary";
import { Button } from "@/components/button/Button";

import { MembershipCard } from "./components/MembershipCard";
import { MembershipInfoRow } from "./components/MembershipInfoRow";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function MembershipPage() {
    const query = useMembershipListQuery();

    return (
        <div className="flex items-center justify-center">
            <div className="mb-24 flex w-full max-w-5xl flex-col gap-6">
                <h1 className="font-tomorrow text-4xl">Membership</h1>
                <hr className="border-gray" />
                {/* Membership status */}
                <LoadingBoundary loading={query.isPending}>
                    <MembershipStatuses memberships={query.data} />
                    <div className="flex justify-end gap-2">
                        <Button variant={{ style: "solid" }}>
                            <span>See advance details</span>
                        </Button>
                        <Button variant={{ style: "cta" }}>
                            <span>Scan in code</span>
                        </Button>
                    </div>
                    <hr className="border-gray" />
                    {/* membership listing */}
                    <div className="flex flex-col gap-2">
                        <div className="font-tomorrow flex gap-2 text-xl">
                            <p className="text-[#978FFE]">All membership(s)</p>
                            <p>({query.data?.length ?? 0})</p>
                        </div>
                        <p className="text-sm">Your membership status</p>
                    </div>
                    <MembershipListing />
                </LoadingBoundary>
            </div>
        </div>
    );
}

const MembershipStatuses = ({ memberships }: { memberships?: MembershipListResponse }) => {
    if (!memberships) return null;

    const active_membership = memberships.find((e) => e.state === "active") ?? memberships[0];

    return (
        <>
            <div className="flex flex-col gap-2">
                <h2 className="font-tomorrow text-xl text-[#978FFE]">Membership status</h2>
                <p className="text-sm">Your membership status</p>
            </div>
            <div className="flex flex-col gap-3">
                <MembershipInfoRow
                    title="Membership type"
                    info={active_membership?.title ?? "No Previous Memberships"}
                />
                <MembershipInfoRow
                    title="Status"
                    info={active_membership?.state ?? "Non applicable"}
                />
                <MembershipInfoRow
                    title="Expiry Date"
                    info={active_membership?.endAt.toDateString() ?? "Non applicable"}
                />
            </div>
        </>
    );
};

const MembershipListing = ({ memberships }: { memberships?: MembershipListResponse }) => {
    if (!memberships) return null;

    if (memberships.length === 0) {
        return (
            <div className="flex w-full flex-col">
                <p className="text-sm">You have no membership</p>
            </div>
        );
    }

    return memberships.map((membership) => (
        <MembershipCard key={membership.id} membership={membership} />
    ));
};
