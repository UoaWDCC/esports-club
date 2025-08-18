import { cn } from "@libs/utils/class";

import { MembershipListResponse } from "@/app/api/membership.list/type";

interface MembershipCardProps {
    membership: MembershipListResponse["memberships"][0];
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Last two digits
    return `${day}/${month}/${year}`;
}

export function MembershipCard({ membership }: MembershipCardProps) {
    const isActive = membership.state === "active";

    return (
        <div
            className={cn(
                "flex w-full flex-col gap-6 rounded-sm p-6",
                isActive ? "border-cta bg-muted-background border" : "bg-muted-background",
            )}
        >
            <div>
                <h3 className="text-xl font-bold">{membership.title}</h3>
                <div className="flex gap-2">
                    <div className="rounded-xs">Expiry: {formatDate(membership.endAt)}</div>
                    <div className="rounded-xs">Reference: {membership.id.slice(0, 8)}</div>
                </div>
            </div>
            <p className="text-muted">{membership?.description && "No description"}</p>
        </div>
    );
}
