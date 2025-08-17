"use client";

import { ApiResponse } from "@libs/api/response";
import { MembershipTypeDTO } from "@libs/types/membershipType.type";
import { useQuery } from "@tanstack/react-query";

export const useMembershipTypeCreateQuery = (MembershipToAdd: MembershipTypeDTO) => {
    const query = useQuery<ApiResponse, Error>({
        queryKey: ["membership-type-create"],
        queryFn: () => membershipTypeCreate(MembershipToAdd),
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const membershipTypeCreate = async (
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
