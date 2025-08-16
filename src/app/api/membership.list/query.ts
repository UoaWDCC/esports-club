"use client";

import { ApiResponse } from "@libs/api/response";
import { StatusOption } from "@libs/types/membership.type";
import { parseDatesArray } from "@libs/utils/date-serializer";
import { useQuery } from "@tanstack/react-query";

import { MembershipListResponse, Status } from "./type";

export const useMembershipListQuery = () => {
    const query = useQuery<
        ApiResponse<MembershipListResponse>,
        Error,
        MembershipListResponse["memberships"]
    >({
        queryKey: ["get-my-memberships"],
        queryFn: fetchMyMemberships,
        select: (res) => {
            // Handle new response format with metadata
            if ("memberships" in res) {
                // Parse dates for all membership objects
                return parseDatesArray(res.memberships);
            }
            return [];
        },
        staleTime: 30000 /*ms*/,
    });
    return query;
};

export const fetchMyMemberships = async (): Promise<ApiResponse<MembershipListResponse>> => {
    const res = await fetch("/api/membership.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    return await res.json();
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
        ApiResponse<MembershipListResponse>,
        Error,
        MembershipListResponse["memberships"]
    >({
        queryKey: ["get-memberships", userId, state, status],
        queryFn: () => fetchMembershipsWithFilters(userId, state, status),
        select: (res) => {
            // Handle new response format with metadata
            if ("memberships" in res) {
                return res.memberships;
            }
            return [];
        },
        staleTime: 30000 /*ms*/,
        enabled: enabled && !!userId,
    });
    return query;
};

export const fetchMembershipsWithFilters = async (
    userId: string,
    state?: Status,
    status?: StatusOption,
): Promise<ApiResponse<MembershipListResponse>> => {
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
