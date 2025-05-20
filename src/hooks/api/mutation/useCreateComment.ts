import CreateComment from "@/services/comments";
import { QueryClient, useMutation } from "@tanstack/react-query";


export const useCreateComment = (queryClient: QueryClient) => {
    const mutation = useMutation({
        mutationFn: CreateComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comment"] });
        },
    });

    return mutation;
};
