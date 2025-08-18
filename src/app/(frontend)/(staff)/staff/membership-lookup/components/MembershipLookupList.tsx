"use client";

import { ZStatusOptions } from "@libs/types/membership.type";
import { useQueryState } from "nuqs";
import { z } from "zod";

import { useMembershipAllQuery } from "@/app/api/membership.all/query";
import { ZState } from "@/app/api/membership.all/type";

import { MembershipLookupRow, MembershipLookupSkeleton } from "./MembershipLookupRow";

export const MembershipLookupList = () => {
    const [state] = useQueryState("state");
    const [status] = useQueryState("status");
    const { data, error, isLoading, isError } = useMembershipAllQuery({
        state: state as z.infer<typeof ZState> | undefined,
        status: status as z.infer<typeof ZStatusOptions> | undefined,
    });

    if (isLoading) {
        return <MembershipLookupSkeleton />;
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
        <MembershipLookupRow key={index} membership={membership} index={index + 1} />
    ));
};
