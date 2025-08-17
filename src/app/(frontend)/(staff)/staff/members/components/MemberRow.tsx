"use client";

import { HTMLAttributes } from "react";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { z } from "zod";

import { MemberList, ProfileColumns, ZProfileColumns } from "@/app/api/member.all/type";

export const MemberTableHeading = () => {
    return (
        <>
            <SortableTableHeading className="w-1/3" label="firstName" />
            <SortableTableHeading className="w-1/3" label="lastName" />
            <SortableTableHeading className="w-full" label="email" />
            <SortableTableHeading className="w-1/5" label="id" />
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
    return Array.from({ length: 10 }).map((_, i) => (
        <tr key={i}>
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
    ));
}

export const SkeletonPill = () => {
    return <div className="skeleton-gradient my-auto h-4 w-1/4 min-w-[50px] rounded-full" />;
};

export const SortableTableHeading = ({
    label,
    ...props
}: { label: z.infer<typeof ZProfileColumns> } & HTMLAttributes<HTMLTableCellElement>) => {
    const [orderColumn, setOrderColumn] = useQueryState(
        "orderColumn",
        ZProfileColumns.default(label),
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
        <th
            {...props}
            onClick={() => {
                setOrdering(label);
            }}
        >
            <div className="flex items-center justify-between">
                <p>{label}</p>
                {orderColumn === label && (
                    <div className="bg-background aspect-square rounded p-1">
                        {descending ? <ArrowDownAZ size={16} /> : <ArrowUpZA size={16} />}
                    </div>
                )}
            </div>
        </th>
    );
};
