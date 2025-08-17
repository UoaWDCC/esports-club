import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@libs/utils/class";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, X } from "lucide-react";

import { MembershipAll } from "@/app/api/membership.all/type";
import { useMemberApprovalMutation } from "@/app/api/membership.approve/mutation";
import { useMemberRejectMutation } from "@/app/api/membership.reject/mutation";

export const ApproveMemberTableHeading = () => (
    <>
        {/* <th className="w-4"></th> */}
        <th className="w-1/4">First name</th>
        <th className="w-1/4">Last name</th>
        <th className="w-1/3">Email</th>
        <th className="w-1/6">Notes</th>
        <th className="w-26">Actions</th>
    </>
);

export function ApproveMemberRow({
    membership,
}: {
    membership: MembershipAll["memberships"][0];
    index: number;
}) {
    const approveMutation = useMemberApprovalMutation();
    const rejectMutation = useMemberRejectMutation();

    return (
        <tr className="*:truncate">
            <td>{membership.firstName}</td>
            <td>{membership.lastName}</td>
            <td>{membership.email}</td>
            <td>{membership.notes}</td>
            <td className="flex gap-3">
                <TableButton
                    membershipId={membership.id}
                    mutation={approveMutation}
                    disabled={rejectMutation.isPending}
                    className="border-green-300 bg-green-300/15 *:stroke-green-300 hover:not-disabled:bg-green-500/40"
                >
                    <Check size={16} strokeWidth={2} />
                </TableButton>
                <TableButton
                    membershipId={membership.id}
                    mutation={rejectMutation}
                    disabled={approveMutation.isPending}
                    className="border-red-300 bg-red-300/15 *:stroke-red-300 hover:not-disabled:bg-red-500/40"
                >
                    <X size={16} strokeWidth={2} />
                </TableButton>
            </td>
        </tr>
    );
}
export function ApproveMemberSkeleton() {
    return (
        <tr>
            <td className="flex">
                <SkeletonPill />
                {/* make skeleton row size the same as one with text */}
                <p className="pointer-events-none invisible w-0">|</p>
            </td>
            <td>
                <SkeletonPill />
            </td>
            <td>
                <SkeletonPill />
            </td>
            <td>
                <SkeletonPill />
            </td>
            <td>
                <SkeletonPill />
            </td>
            <td>
                <SkeletonPill />
            </td>
        </tr>
    );
}

export const SkeletonPill = () => {
    return <div className="skeleton-gradient my-auto h-4 w-1/4 min-w-[50px] rounded-full" />;
};

interface TableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    mutation: UseMutationResult<any, Error, any, any>;
    membershipId: string;
}

const TableButton = ({ children, mutation, membershipId, ...props }: TableButtonProps) => {
    const queryClient = useQueryClient();
    return (
        <button
            {...props}
            onClick={() =>
                mutation.mutate(
                    { membershipId },
                    {
                        onSuccess: () => {
                            // invalidate all "all-membership" and make it refetch on other components
                            queryClient.invalidateQueries({ queryKey: ["get-all-memberships"] });
                        },
                    },
                )
            }
            className={cn(
                "grid aspect-square size-8 origin-center place-items-center rounded border transition not-disabled:cursor-pointer disabled:brightness-60",
                props.className,
            )}
        >
            {mutation.isPending ? <Loader2 className="animate-spin" size={16} /> : children}
        </button>
    );
};
