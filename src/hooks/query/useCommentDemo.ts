"use client";

// THIS IS A DEMO EXAMPLE FOR TANSTACK QUERY
import { fetchPlaceholder } from "@libs/fetch/placeholder";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetPlaceholder = () => {
    const query = useSuspenseQuery({
        queryKey: ["placeholder"],
        queryFn: fetchPlaceholder,
        staleTime: 5000 /*ms*/,
    });

    return query;
};

export { useGetPlaceholder as useGetComment };
