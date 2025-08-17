import { ApiResponse } from "@libs/api/response";
import { useQuery } from "@tanstack/react-query";

import {
    MembershipAll,
    MembershipAllRequest,
    ZMembershipAllRouteRequest,
    ZMembershipAllRouteResponse,
} from "./type";

export const useMembershipAllQuery = (request?: MembershipAllRequest) => {
    const query = useQuery<MembershipAll, Error, MembershipAll>({
        queryKey: ["get-all-memberships", request],
        queryFn: () => fetchAllMemberships(request),
        staleTime: 30000 /*ms*/,
    });
    return query;
};

export const fetchAllMemberships = async (request?: MembershipAllRequest) => {
    const res = await fetch("/api/membership.all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: request ? JSON.stringify(request) : undefined,
        cache: "no-cache",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch all memberships");
    }

    const { data, success } = ZMembershipAllRouteResponse.safeParse(await res.json());

    if (!success) {
        throw new Error("Failed to fetch all memberships");
    }

    return data;
};
