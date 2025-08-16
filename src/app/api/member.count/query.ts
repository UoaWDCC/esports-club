"use client";

import { useQuery } from "@tanstack/react-query";

import { MemberCount, ZMemberCountResponse } from "./type";

export const useMemberCountQuery = () => {
    const query = useQuery<MemberCount, Error, MemberCount>({
        queryKey: ["members-count"],
        queryFn: fetchMembersCount,
        staleTime: 60000, // 60 seconds
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return query;
};

export const fetchMembersCount = async () => {
    const res = await fetch("/api/member.count");
    if (!res.ok) {
        throw new Error("Failed to fetch members");
    }

    const data = await res.json();

    return ZMemberCountResponse.parse(data);
};
