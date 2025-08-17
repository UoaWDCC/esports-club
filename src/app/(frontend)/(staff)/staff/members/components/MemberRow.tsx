"use client";

import { parseAsBoolean, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

import { MemberList, ProfileColumns, ZProfileColumns } from "@/app/api/member.all/type";

export const MemberTableHeading = () => {
    const [orderColumn, setOrderColumn] = useQueryState(
        "orderColumn",
        ZProfileColumns.default("firstName"),
    );
    const [descending, setDescending] = useQueryState(
        "columnDirecton",
        parseAsBoolean.withDefault(true),
    );

    const setOrdering = (columnName: string) => {
        if (orderColumn == columnName) {
            setDescending(!descending);
            return;
        }

        setOrderColumn(columnName as ProfileColumns);
        setDescending(true);
    };
    return (
        <>
            <th
                className="w-1/3"
                onClick={() => {
                    setOrdering("firstName");
                }}
            >
                First name
            </th>

            <th
                className="w-1/3"
                onClick={() => {
                    setOrdering("lastName");
                }}
            >
                Last name
            </th>
            <th
                className="w-full"
                onClick={() => {
                    setOrdering("email");
                }}
            >
                Email
            </th>
            <th
                className="w-1/5"
                onClick={() => {
                    setOrdering("id");
                }}
            >
                Id
            </th>
        </>
    );
};

export function MemberRow({ member }: { member: MemberList["members"][0]; index: number }) {
    return (
        <tr className="*:truncate">
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.email}</td>
            <td>{member.id}</td>
        </tr>
    );
}
export function MemberSkeleton() {
    return (
        <tr>
            <td className="flex">
                <SkeletonPill />
                {/* make skeleton row size the same as one with text */}
                <p className="pointer-events-none invisible w-0">|</p>
            </td>
            <td>
                <SkeletonPill />
            </td>
            <td>
                <SkeletonPill />
            </td>
            <td>
                <SkeletonPill />
            </td>
        </tr>
    );
}

export const SkeletonPill = () => {
    return <div className="skeleton-gradient my-auto h-4 w-1/4 min-w-[50px] rounded-full" />;
};
