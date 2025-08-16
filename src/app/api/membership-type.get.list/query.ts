// Shared enum for filtering
import { useQuery } from "@tanstack/react-query";

import { MembershipTypeListRequest } from "./type";

export const useMembershipTypeListQuery = (includeInactive: boolean = false) => {
    const query = useQuery({
        queryKey: ["get-membership-type-list", includeInactive],
        queryFn: () => fetchMembershipTypeList(includeInactive),
        staleTime: 50000 /*ms*/,
    });
    return query;
};

export const fetchMembershipTypeList = async (includeInactive: boolean = false) => {
    const data: MembershipTypeListRequest = { includeInactive };
    // free api
    const res = await fetch("/api/membership-type.get.list", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(data), // Convert data to JSON string
    });

    return res.json();
};
