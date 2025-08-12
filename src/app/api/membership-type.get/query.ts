// Shared enum for filtering
import { useQuery } from "@tanstack/react-query";

import { MembershipTypeRequest } from "./type";

export const useMembershipTypeQuery = (id: string) => {
    const query = useQuery({
        queryKey: ["get-membership-type"],
        queryFn: () => fetchMembershipType(id),
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const fetchMembershipType = async (id: string) => {
    const data: MembershipTypeRequest = { ms_id: id };
    // free api
    const res = await fetch("/api/membership-type.get", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(data), // Convert data to JSON string
    });

    return res.json();
};
