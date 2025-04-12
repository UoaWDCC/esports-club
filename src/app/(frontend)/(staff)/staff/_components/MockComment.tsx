"use client";

import React from "react";
import { CommentDTO } from "@libs/types/CommentDTO";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@ui/button/Button";

import { useCreateComment } from "@/hooks/api/mutation/useCreateComment";
import { useGetComment } from "@/hooks/api/query/useCommentDemo";

const MockUser = () => {
    const queryClient = useQueryClient();

    // automatically fetch data
    const { data, isFetching } = useGetComment();
    const { mutate: createUser, error, isPending } = useCreateComment(queryClient);

    const handleCreate = () => {
        // try it out
        const isValidComment = true;
        if (!isValidComment) {
            createUser({} as CommentDTO);
        } else {
            createUser({
                body: "test",
                email: "test@gmail.com",
                name: "test",
                postId: "1",
                id: "2",
            } as CommentDTO);
        }
    };

    const isLoading = isFetching || isPending;

    return (
        <div className="flex flex-col gap-8">
            <Button onClick={handleCreate} isLoading={isLoading}>
                &quot;create user&quot;
            </Button>
            <p>{isFetching ? "loading" : JSON.stringify(data)}</p>
            <p>{error?.message}</p>
        </div>
    );
};

export default MockUser;
