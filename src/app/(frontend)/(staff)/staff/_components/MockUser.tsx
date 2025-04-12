"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SuspenseButton from "@ui/button/SuspenseButton";

import { useMockUser } from "@/hooks/api/MockUser";
import mockCreateUser from "@/server/mockCreateUser";

const MockUser = () => {
    const { data, isLoading } = useMockUser();
    const queryClient = useQueryClient();

    //
    const mutation = useMutation({
        mutationFn: mockCreateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const handleCreate = () => {
        mutation.mutate({ id: 1, name: "test" });
    };

    const loading = mutation.isPending || isLoading;

    return (
        <div>
            <SuspenseButton onClick={handleCreate} isLoading={loading}>
                &quot;create user&quot;
            </SuspenseButton>
            {JSON.stringify(data)}
        </div>
    );
};

export default MockUser;
