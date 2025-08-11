"use client";

// Shared enum for filtering
import { useEffect, useState } from "react";
import { ApiResponse } from "@libs/api/response";
import { useQuery } from "@tanstack/react-query";

import { MembershipListRouteResponse, Status, ZMembershipListRouteResponse } from "./type";

export const useGetMyMemberships = () => {
    const query = useQuery<
        ApiResponse<MembershipListRouteResponse[]>,
        Error,
        MembershipListRouteResponse[]
    >({
        queryKey: ["myMemberships"],
        queryFn: fetchMyMemberships,
        select: (res) => res.data ?? [],
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const fetchMyMemberships = async (): Promise<ApiResponse<MembershipListRouteResponse[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const res = await fetch("/api/membership.list", { cache: "no-cache" });
    if (!res.ok) {
        throw new Error("Failed to fetch memberships");
    }

    return await res.json();
};
