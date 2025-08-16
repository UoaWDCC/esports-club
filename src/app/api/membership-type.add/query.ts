import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MembershipTypeAddRequest } from "./type";

export const useMembershipTypeAddMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: MembershipTypeAddRequest) => {
            const response = await fetch("/api/membership-type.add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add membership type");
            }

            return response.json();
        },
        onSuccess: () => {
            // Invalidate and refetch membership types list
            queryClient.invalidateQueries({ queryKey: ["get-membership-type-list"] });
        },
    });
};
