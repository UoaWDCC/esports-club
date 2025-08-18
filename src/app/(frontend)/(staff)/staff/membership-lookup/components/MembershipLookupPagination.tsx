"use client";

import React from "react";

import { Status } from "@/components/status";

export const MembershipLookupPagination = () => {
    const stateOptions = [
        { value: "active", label: "Active" },
        { value: "expired", label: "Expired" },
    ];

    const statusOptions = [
        { value: "rejected", label: "rejected" },
        { value: "pending", label: "pending" },
        { value: "approved", label: "approve" },
    ];

    return (
        <div className="flex w-full justify-end">
            <div className="flex flex-col items-end gap-2">
                <Status queryKey="state" title="State" options={stateOptions} />
                <Status queryKey="status" title="Status" options={statusOptions} />
            </div>
        </div>
    );
};
