"use client";

import React from "react";
import { useCreateUser } from "@libs/api/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@ui/button/Button";

import { useMockUser } from "@/hooks/api/MockUser";

const MockUser = () => {
    // automatically fetch data
    const { data, isFetching } = useMockUser();
    const queryClient = useQueryClient();

    const { mutate } = useCreateUser(queryClient);

    const handleCreate = () => {
        mutate({ id: 1, name: "test" });
    };

    return (
        <div>
            <Button onClick={handleCreate} isLoading={isFetching}>
                &quot;create user&quot;
            </Button>
            {isFetching ? "loading" : JSON.stringify(data)}
        </div>
    );
};

export default MockUser;
