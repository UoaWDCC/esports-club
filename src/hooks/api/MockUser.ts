"use client";

import { getUsers } from "@libs/api/query/user";
import { useQuery } from "@tanstack/react-query";

const useMockUser = () => {
    const query = useQuery({ queryKey: ["user"], queryFn: getUsers, staleTime: 5000 /*ms*/ });

    return query;
};

export { useMockUser };
