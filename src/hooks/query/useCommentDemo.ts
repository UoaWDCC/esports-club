"use client";

// THIS IS A DEMO EXAMPLE FOR TANSTACK QUERY
import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchPlaceholder } from "@/libs/fetch/placeholder";

const useGetPlaceholder = () => {
    const query = useSuspenseQuery({
        queryKey: ["placeholder"],
        queryFn: fetchPlaceholder,
        staleTime: 5000 /*ms*/,
    });

    return query;
};

export { useGetPlaceholder as useGetComment };
