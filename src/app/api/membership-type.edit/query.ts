import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MembershipTypeEditRequest } from "./type";

export const useMembershipTypeEditMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: MembershipTypeEditRequest) => {
            const response = await fetch("/api/membership-type.edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to edit membership type");
            }

            return response.json();
        },
        onSuccess: () => {
            // Invalidate and refetch membership types list
            queryClient.invalidateQueries({ queryKey: ["get-membership-type-list"] });
        },
    });
};
