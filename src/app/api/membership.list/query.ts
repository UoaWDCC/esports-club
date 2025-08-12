"use client";

import { ApiResponse } from "@libs/api/response";
import { useQuery } from "@tanstack/react-query";

import { MembershipListRouteResponse } from "./type";

export const useMembershipListQuery = () => {
    const query = useQuery<
        ApiResponse<MembershipListRouteResponse[]>,
        Error,
        MembershipListRouteResponse[]
    >({
        queryKey: ["get-my-memberships"],
        queryFn: fetchMyMemberships,
        select: (res) => res.data ?? [],
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const fetchMyMemberships = async (): Promise<ApiResponse<MembershipListRouteResponse[]>> => {
    const res = await fetch("/api/membership.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    return await res.json();
};
