"use client";

import { useQuery } from "@tanstack/react-query";

import { MembershipListResponse, ZMembershipListResponse } from "./type";

export const useMembershipListQuery = () => {
    const query = useQuery<MembershipListResponse, Error, MembershipListResponse>({
        queryKey: ["get-my-memberships"],
        queryFn: fetchMyMemberships,
        staleTime: 30000, // 30 seconds
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return query;
};

export const fetchMyMemberships = async () => {
    const res = await fetch("/api/membership.list");
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    const data = await res.json();

    return ZMembershipListResponse.parse(data);
};
