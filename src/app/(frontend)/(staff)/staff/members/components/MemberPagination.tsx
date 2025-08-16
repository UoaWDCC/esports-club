"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { useMemberCountQuery } from "@/app/api/member.count/query";

export const MemberPagination = () => {
    const [pageIndex, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
    const [limit, setLimit] = useQueryState("limit", parseAsInteger.withDefault(50));
    const { data, isSuccess } = useMemberCountQuery();

    const totalPages = data ? Math.ceil(data.totalItems / limit) : 1;

    const handleSetPage = (index: number) => {
        if (totalPages >= index && index > 0) {
            setPage(index);
        }
    };

    const handleSetLimit = (value: number) => {
        setLimit(value);
        setPage(1);
    };

    return (
        <div className="flex w-full justify-end">
            <div className="flex flex-col items-end gap-2">
                <div className="*:border-border flex gap-2 overflow-hidden *:cursor-pointer *:border *:p-1">
                    <p className="bg-muted-background !px-3">Page</p>
                    <button onClick={() => handleSetPage(pageIndex - 1)}>
                        <ChevronLeft size={16} />
                    </button>
                    <p className="bg-muted-background w-12 !px-3 text-center">
                        {pageIndex}/{isSuccess && Math.ceil(data.totalItems / limit)}
                    </p>
                    <button onClick={() => handleSetPage(pageIndex + 1)}>
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="*:border-border flex gap-2 overflow-hidden *:cursor-pointer *:border *:p-1">
                    <p className="bg-muted-background !px-3">Limit</p>
                    <button onClick={() => handleSetLimit(1)}>1</button>
                    <button onClick={() => handleSetLimit(10)}>10</button>
                    <button onClick={() => handleSetLimit(25)}>25</button>
                    <button onClick={() => handleSetLimit(50)}>50</button>
                    <button onClick={() => handleSetLimit(100)}>100</button>
                    <button onClick={() => handleSetLimit(250)}>250</button>
                    <button onClick={() => handleSetLimit(9999)}>ALL</button>
                </div>
            </div>
        </div>
    );
};
