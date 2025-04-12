"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@ui/button/Button";

import { useMockUser } from "@/hooks/api/MockUser";
import mockCreateUser from "@/server/mockCreateUser";

const MockUser = () => {
    const { data } = useMockUser();
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

    return (
        <div>
            <Button onClick={handleCreate}>create user</Button>
            {JSON.stringify(data)}
        </div>
    );
};

export default MockUser;
