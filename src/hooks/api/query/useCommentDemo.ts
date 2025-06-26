"use client";

import { getComment } from "@/services/comments";
// THIS IS A DEMO EXAMPLE FOR TANSTACK QUERY
import { useQuery } from "@tanstack/react-query";


const useGetComment = () => {
    const query = useQuery({ queryKey: ["comment"], queryFn: getComment, staleTime: 5000 /*ms*/ });

    return query;
};

export { useGetComment };
