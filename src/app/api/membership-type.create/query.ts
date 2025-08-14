"use client";

import { ApiResponse } from "@libs/api/response";
import { MembershipType, MembershipTypeDTO } from "@libs/types/membershipType.type";
import { useQuery } from "@tanstack/react-query";

export const useMembershipTypeCreateQuery = (MembershipToAdd: MembershipTypeDTO) => {
    const query = useQuery<ApiResponse, Error>({
        queryKey: ["get-my-memberships"],
        queryFn: () => fetchMyMemberships(MembershipToAdd),
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const fetchMyMemberships = async (
    MembershipToAdd: MembershipTypeDTO,
): Promise<ApiResponse> => {
    // free api
    const res = await fetch("/api/membership-type.get", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(MembershipToAdd), // Convert data to JSON string
    });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }
    return await res.json();
};
