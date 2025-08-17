import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SyncResult {
    created: number;
    updated: number;
    deleted: number;
    errors: string[];
}

export const useMembershipTypeSyncStripeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<SyncResult> => {
            const response = await fetch("/api/membership-type.sync-stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to sync membership types with Stripe");
            }

            const data = await response.json();
            return data.data;
        },
        onSuccess: () => {
            // Invalidate membership types queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["membershipTypes"] });
        },
    });
};
