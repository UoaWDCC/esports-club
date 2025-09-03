import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProfileUpdateRequest } from "./type";

export const useProfileUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ProfileUpdateRequest) => {
            const response = await fetch("/api/profile.update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            return response.json();
        },
        onSuccess: () => {
            // Invalidate profile-related queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: ["profile"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["profile-list"], exact: false });
        },
    });
};
