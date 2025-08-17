"use client";

import { useQuery } from "@tanstack/react-query";

import { MemberList, ZMemberListResponse } from "./type";

export const useMemberListQuery = (page: number, limit: number) => {
    const query = useQuery<MemberList, Error, MemberList>({
        queryKey: ["get-all-members", page, limit],
        queryFn: () => fetchMyMemberships(page, limit),
        staleTime: 30000, // 30 seconds
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return query;
};

export const fetchMyMemberships = async (page: number, limit: number) => {
    const body = { page, limit };
    const res = await fetch("/api/member.all", { method: "POST", body: JSON.stringify(body) });
    if (!res.ok) {
        throw new Error("Failed to fetch members");
    }

    const data = await res.json();

    return ZMemberListResponse.parse(data);
};
