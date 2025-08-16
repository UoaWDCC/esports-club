import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MembershipTypeDeleteRequest } from "./type";

export const useMembershipTypeDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: MembershipTypeDeleteRequest) => {
            const response = await fetch("/api/membership-type.delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete membership type");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-membership-type-list"], exact: false });

            queryClient.invalidateQueries({ queryKey: ["get-membership-type"] });
        },
    });
};
