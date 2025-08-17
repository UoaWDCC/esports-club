"use client";

import { ApiResponse } from "@libs/api/response";
import { MembershipType } from "@libs/types/membershipType.type";
import { useQuery } from "@tanstack/react-query";

export const useMembershipTypeUpdateQuery = (MembershipToUpdate: MembershipType) => {
    const query = useQuery<ApiResponse, Error>({
        queryKey: ["membership-type-create"],
        queryFn: () => updateMembershipType(MembershipToUpdate),
        staleTime: 5000 /*ms*/,
    });
    return query;
};

const updateMembershipType = async (MembershipToAdd: MembershipType): Promise<ApiResponse> => {
    // free api
    const res = await fetch("/api/membership-type.get", {
        method: "PUT",
        cache: "no-cache",
        body: JSON.stringify(MembershipToAdd), // Convert data to JSON string
    });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }
    return await res.json();
};
