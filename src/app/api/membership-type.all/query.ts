"use client";

import { ApiResponse } from "@libs/api/response";
import { MembershipType } from "@libs/types/membershipType.type";
import { useQuery } from "@tanstack/react-query";

export const useMembershipTypeAllQuery = () => {
    const query = useQuery<ApiResponse<MembershipType[]>, Error, MembershipType[]>({
        queryKey: ["memebership-type-all"],
        queryFn: membershipTypeAll,
        select: (res) => res.data ?? [],
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const membershipTypeAll = async (): Promise<ApiResponse<MembershipType[]>> => {
    const res = await fetch("/api/membership-type.all", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    return await res.json();
};
