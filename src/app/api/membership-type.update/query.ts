import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MembershipTypeUpdateRequest } from "./type";

export const useMembershipTypeUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: MembershipTypeUpdateRequest) => {
            const response = await fetch("/api/membership-type.update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update membership type");
            }

            return response.json();
        },
        onSuccess: () => {
            console.log("INVALIDATED");

            queryClient.invalidateQueries({ queryKey: ["membership-type-list"], exact: false });
            // Also invalidate any specific membership type queries
            queryClient.invalidateQueries({ queryKey: ["membership-type"] });
        },
    });
};
