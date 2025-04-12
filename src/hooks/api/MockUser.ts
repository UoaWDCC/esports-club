"use client";

import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
    const random = Math.floor(Math.random() * 10);
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${random}`, {
        cache: "no-cache",
    });
    return res.json();
};

const useMockUser = () => {
    const query = useQuery({ queryKey: ["user"], queryFn: getUsers, staleTime: 5000 /*ms*/ });

    return query;
};

export { useMockUser };
