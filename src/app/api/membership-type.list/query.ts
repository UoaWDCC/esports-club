import { parseDatesArray } from "@libs/utils/date-serializer";
import { useQuery } from "@tanstack/react-query";

import { MembershipType } from "@/libs/types/membershipType.type";

import { MembershipTypeListRequest } from "./type";

export const useMembershipTypeListQuery = (includeInactive: boolean = false) => {
    const query = useQuery({
        queryKey: ["membership-type-list", includeInactive],
        queryFn: () => fetchMembershipTypeList(includeInactive),
        select: (res): { data: MembershipType[] } => {
            // Extract all properties except metadata
            //ANNOYING AHH LINT ERROR unused imports cant use below
            // const { metadata: _, ...data } = res;

            const data = Object.fromEntries(
                Object.entries(res).filter(([key]) => key !== "metadata"),
            );
            const membershipTypes = Object.values(data).flat() as MembershipType[];
            return { data: parseDatesArray(membershipTypes) };
        },
        staleTime: 50000,
    });
    return query;
};

export const fetchMembershipTypeList = async (includeInactive: boolean = false) => {
    const data: MembershipTypeListRequest = { includeInactive };

    const res = await fetch("/api/membership-type.list", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch membership types");
    }

    const result = await res.json();
    return result;
};
