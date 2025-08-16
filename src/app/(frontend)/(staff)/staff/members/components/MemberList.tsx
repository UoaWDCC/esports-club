"use client";

import { parseAsInteger, useQueryState } from "nuqs";

import { useMemberListQuery } from "@/app/api/member.all/query";

import { MemberRow } from "./MemberRow";

export const MemberList = () => {
    const [pageIndex] = useQueryState("page", parseAsInteger.withDefault(1));
    const [limit] = useQueryState("limit", parseAsInteger.withDefault(50));
    const { data, error, isLoading, isError } = useMemberListQuery(pageIndex, limit);

    if (isLoading) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    Loading...
                </td>
            </tr>
        );
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

    const { members } = data;

    return members.map((member, index) => (
        <MemberRow key={index} member={member} index={index + 1} />
    ));
};
