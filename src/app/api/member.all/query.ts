"use client";

import { useQuery } from "@tanstack/react-query";

import { MemberList, ZMemberListResponse } from "./type";

export const useMemberListQuery = () => {
    const query = useQuery<MemberList, Error, MemberList>({
        queryKey: ["get-all-members"],
        queryFn: fetchMyMemberships,
        staleTime: 30000, // 30 seconds
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return query;
};

export const fetchMyMemberships = async () => {
    const res = await fetch("/api/member.all", { method: "POST" });
    if (!res.ok) {
        throw new Error("Failed to fetch members");
    }

    const data = await res.json();

    return ZMemberListResponse.parse(data);
};
