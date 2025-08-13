"use client";

import { ApiResponse } from "@libs/api/response";
import { useQuery } from "@tanstack/react-query";

import { MembershipListResponse } from "./type";

export const useMembershipListQuery = () => {
    const query = useQuery<
        ApiResponse<MembershipListResponse>,
        Error,
        ApiResponse<MembershipListResponse>
    >({
        queryKey: ["get-my-memberships"],
        queryFn: fetchMyMemberships,
        staleTime: 5000 /*ms*/,
    });

    return { ...query, data: (query.data?.data || []) as MembershipListResponse };
};

export const fetchMyMemberships = async (): Promise<ApiResponse<MembershipListResponse>> => {
    const res = await fetch("/api/membership.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    return await res.json();
};
