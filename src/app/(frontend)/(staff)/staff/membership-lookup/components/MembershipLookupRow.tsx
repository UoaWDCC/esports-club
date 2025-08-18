import { Info } from "lucide-react";

import { MembershipAll } from "@/app/api/membership.all/type";
import { DialogContent, DialogProvider, DialogTrigger } from "@/components/dialog";

export const MembershipLookupTableHeading = () => (
    <>
        <th className="w-1/3">Own by</th>
        <th className="w-1/4">Email</th>
        <th className="w-1/5">Type</th>
        <th className="w-1/6">State</th>
        <th className="w-1/6">Status</th>
        <th className="w-1/6">Note</th>
        <th className="w-16">Info</th>
    </>
);

export function MembershipLookupRow({
    membership,
}: {
    membership: MembershipAll["memberships"][0];
    index: number;
}) {
    return (
        <tr className="*:truncate">
            <td>
                {membership.firstName} {membership.lastName}
            </td>
            <td>{membership.email}</td>
            <td>{membership.type}</td>
            <td>{membership.state}</td>
            <td>{membership.status}</td>
            <td>{membership.notes}</td>
            <td>
                <MemberInfoDialog membership={membership} />
            </td>
        </tr>
    );
}

const MemberInfoDialog = ({ membership }: { membership: MembershipAll["memberships"][0] }) => {
    return (
        <DialogProvider>
            <DialogTrigger
                className="grid aspect-square size-8 origin-center cursor-pointer place-items-center rounded border transition hover:bg-gray-100"
                type="button"
            >
                <Info size={16} />
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Member Information</h2>
                    <div className="flex flex-col gap-2">
                        <p>
                            <strong>Name:</strong> {membership.firstName} {membership.lastName}
                        </p>
                        <p>
                            <strong>Email:</strong> {membership.email}
                        </p>
                        <p>
                            <strong>Type:</strong> {membership.type}
                        </p>
                        <p>
                            <strong>State:</strong> {membership.state}
                        </p>
                        <p>
                            <strong>Status:</strong> {membership.status}
                        </p>
                        <p>
                            <strong>Notes:</strong> {membership.notes}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </DialogProvider>
    );
};

const TableButton = () => {
    return (
        <button
            className="grid aspect-square size-8 origin-center cursor-pointer place-items-center rounded border transition hover:bg-gray-100"
            type="button"
        >
            <Info size={16} />
        </button>
    );
};

export function MembershipLookupSkeleton() {
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
            <td></td>
        </tr>
    );
}

export const SkeletonPill = () => {
    return <div className="skeleton-gradient my-auto h-4 w-1/4 min-w-[50px] rounded-full" />;
};
