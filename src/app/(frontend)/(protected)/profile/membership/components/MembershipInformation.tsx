"use client";

import React from "react";

import { useMembershipListQuery } from "@/app/api/membership.list/query";
import { MembershipListResponse } from "@/app/api/membership.list/type";
import { Button } from "@/components/button/Button";

import { MembershipCard } from "./MembershipCard";
import { MembershipInfoRow } from "./MembershipInfoRow";

export const MembershipInformation = () => {
    const { data, error, isLoading, isError } = useMembershipListQuery();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    if (!data) {
        return <p>No data</p>;
    }

    const { memberships } = data;

    return (
        <>
            <MembershipStatuses memberships={memberships} />
            <div className="flex justify-end gap-2">
                <Button variant={{ style: "cta" }}>
                    <span>Member code</span>
                </Button>
            </div>
            <hr className="border-gray" />
            {/* membership listing */}
            <div className="flex flex-col gap-2">
                <div className="font-tomorrow flex gap-2 text-xl">
                    <p>All membership(s)</p>
                    <p>({memberships.length ?? 0})</p>
                </div>
                <p className="text-sm">Your membership status</p>
            </div>
            <MembershipListing memberships={memberships} />
        </>
    );
};

const MembershipStatuses = ({
    memberships,
}: {
    memberships?: MembershipListResponse["memberships"];
}) => {
    if (!memberships) return <p>No membership</p>;

    const active_membership = memberships.find((e) => e.state === "active") ?? memberships[0];

    return (
        <div className="bg-muted-background rounded-sm p-6">
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
        </div>
    );
};

const MembershipListing = ({
    memberships,
}: {
    memberships?: MembershipListResponse["memberships"];
}) => {
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
