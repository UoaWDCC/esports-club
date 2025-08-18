"use client";

import { ApiResponse } from "@libs/api/response";
import { parseDatesArray } from "@libs/utils/date-serializer";
import { useQuery } from "@tanstack/react-query";

import { ProfileListRequest, ProfileListResponse } from "./type";

export const useProfileListQuery = () => {
    const query = useQuery<
        ApiResponse<ProfileListResponse>,
        Error,
        ProfileListResponse["profiles"]
    >({
        queryKey: ["get-profiles"],
        queryFn: fetchProfiles,
        select: (res) => {
            // Handle new response format with metadata
            if ("profiles" in res) {
                // Parse dates for all membership objects
                return parseDatesArray(res.profiles);
            }
            return [];
        },
        staleTime: 30000 /*ms*/,
    });
    return query;
};

export const fetchProfiles = async (): Promise<ApiResponse<ProfileListResponse>> => {
    const res = await fetch("/api/membership.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch profiles");
    }

    return await res.json();
};

/**
 * Hook to fetch profiles with these optional filters
 * @param p_id - The user ID to fetch profiles for
 * @param email - email
 * @param university - university
 * @param first_name - first name
 * @param last_name
 *
 * @param ordering - column and descending boolean
 */
export const useProfileListQueryWithFilters = (request: ProfileListRequest) => {
    const query = useQuery<
        ApiResponse<ProfileListResponse>,
        Error,
        ProfileListResponse["profiles"]
    >({
        queryKey: ["get-profiles-filtered"],
        queryFn: () => fetchProfilesWithFilters(request),
        select: (res) => {
            // Handle new response format with metadata
            if ("profiles" in res) {
                return res.profiles;
            }
            return [];
        },
        staleTime: 30000 /*ms*/,
    });
    return query;
};

export const fetchProfilesWithFilters = async (
    request: ProfileListRequest,
): Promise<ApiResponse<ProfileListResponse>> => {
    const res = await fetch("/api/membership.list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        cache: "no-cache",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    return await res.json();
};
