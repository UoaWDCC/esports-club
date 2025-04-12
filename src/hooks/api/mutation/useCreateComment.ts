import { QueryClient, useMutation } from "@tanstack/react-query";

import CreateComment from "@/server/comments";

export const useCreateComment = (queryClient: QueryClient) => {
    const mutation = useMutation({
        mutationFn: CreateComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comment"] });
        },
    });

    return mutation;
};
