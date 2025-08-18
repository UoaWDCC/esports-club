"use client";

import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";

import { useMemberListQuery } from "@/app/api/member.all/query";
import { MemberOrdering, ZProfileColumns } from "@/app/api/member.all/type";

import { MemberRow, MemberSkeleton } from "./MemberRow";

export const MemberList = () => {
    const [pageIndex] = useQueryState("page", parseAsInteger.withDefault(1));
    const [limit] = useQueryState("limit", parseAsInteger.withDefault(50));
    const [orderColumn] = useQueryState("orderColumn", ZProfileColumns.default("firstName"));
    const [columnDirection] = useQueryState("columnDirecton", parseAsBoolean.withDefault(true));
    const ordering = {
        column: orderColumn ?? "firstName",
        descending: columnDirection,
    } as MemberOrdering;

    const { data, error, isLoading, isError } = useMemberListQuery(pageIndex, limit, ordering);

    if (isLoading) {
        return <MemberSkeleton />;
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
