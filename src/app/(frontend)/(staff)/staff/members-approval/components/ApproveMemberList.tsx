"use client";

import { useMembershipAllQuery } from "@/app/api/membership.all/query";

import { ApproveMemberRow, ApproveMemberSkeleton } from "./ApproveMemberRow";

export const ApproveMemberList = () => {
    const { data, error, isLoading, isError } = useMembershipAllQuery({
        state: "active",
        status: "pending",
    });

    if (isLoading) {
        return <ApproveMemberSkeleton />;
    }

    if (isError) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    {error.message}
                </td>
            </tr>
        );
    }

    if (!data) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    No data
                </td>
            </tr>
        );
    }

    const { memberships } = data;

    return memberships.map((membership, index) => (
        <ApproveMemberRow key={index} membership={membership} index={index + 1} />
    ));
};
