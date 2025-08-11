// Shared enum for filtering
import { useQuery } from "@tanstack/react-query";

import { MembershipTypeRequest } from "./type";

export const useGetMembershipType = (id: string) => {
    const query = useQuery({
        queryKey: ["myMemberships"],
        queryFn: () => fetchMembershipType(id),
        staleTime: 5000 /*ms*/,
    });
    return query;
};

export const fetchMembershipType = async (id: string) => {
    // Simulate additional network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    const random = Math.floor(1 + Math.random() * 100);
    const data: MembershipTypeRequest = { ms_id: id };
    // free api
    const res = await fetch("/api/membership-type.get", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(data), // Convert data to JSON string
    });

    return res.json();
};
