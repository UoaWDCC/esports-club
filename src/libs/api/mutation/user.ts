import { QueryClient, useMutation } from "@tanstack/react-query";

import mockCreateUser from "@/server/mockCreateUser";

export const useCreateUser = (queryClient: QueryClient) => {
    const mutation = useMutation({
        mutationFn: mockCreateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    return { mutate: mutation.mutate };
};
