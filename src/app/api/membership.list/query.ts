"use client";

import { StatusOption } from "@libs/types/membership.type";
import { useQuery } from "@tanstack/react-query";

import { MembershipListResponse, Status, ZMembershipListResponse } from "./type";

export const useMembershipListQuery = () => {
    const query = useQuery<MembershipListResponse, Error, MembershipListResponse>({
        queryKey: ["get-my-memberships"],
        queryFn: fetchMyMemberships,
        select: (res) => res.data ?? [],
        staleTime: 30000 /*ms*/,
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

/**
 * Hook to fetch memberships for a specific user with optional filtering
 * @param userId - The user ID to fetch memberships for
 * @param state - Optional state filter ("active" | "expired")
 * @param status - Optional status filter ("approved" | "pending" | "rejected")
 */
export const useMembershipListQueryWithFilters = (
    userId: string,
    state?: Status,
    status?: StatusOption,
    enabled: boolean = true,
) => {
    const query = useQuery<
        ApiResponse<MembershipListRouteResponse[]>,
        Error,
        MembershipListRouteResponse[]
    >({
        queryKey: ["get-memberships", userId, state, status],
        queryFn: () => fetchMembershipsWithFilters(userId, state, status),
        select: (res) => res.data ?? [],
        staleTime: 30000 /*ms*/,
        enabled: enabled && !!userId,
    });
    return query;
};

export const fetchMembershipsWithFilters = async (
    userId: string,
    state?: Status,
    status?: StatusOption,
): Promise<ApiResponse<MembershipListRouteResponse[]>> => {
    const res = await fetch("/api/membership.list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            ...(state && { state }),
            ...(status && { status }),
        }),
        cache: "no-cache",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    return await res.json();
};
