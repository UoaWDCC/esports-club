"use client";

// THIS IS A DEMO EXAMPLE FOR TANSTACK QUERY
import { useQuery } from "@tanstack/react-query";

import { getComment } from "@/server/comments";

const useGetComment = () => {
    const query = useQuery({ queryKey: ["comment"], queryFn: getComment, staleTime: 5000 /*ms*/ });

    return query;
};

export { useGetComment };
