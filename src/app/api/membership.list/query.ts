"use client";

import { parseQuery, ServerResponse } from "@libs/api/response";
import { useQuery } from "@tanstack/react-query";

import { MembershipListResponse, ZMembershipListResponse } from "./type";

export const useMembershipListQuery = () => {
    const query = useQuery<MembershipListResponse, Error, MembershipListResponse>({
        queryKey: ["get-my-memberships"],
        queryFn: fetchMyMemberships,
        staleTime: 30000, // 30 seconds
    });

    return query;
};

export const fetchMyMemberships = async () => {
    const res = await fetch("/api/membership.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    const responseData = await res.json();

    const data = parseQuery(responseData, ZMembershipListResponse);

    return responseData;
};
