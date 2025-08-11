import { ZMembershipType } from "@libs/types/membershipType.type";
import { cn } from "@libs/utils/class";
import { membershipTypes } from "@schema";

import { useGetMembershipType } from "@/app/api/membership-type.get/query";
import { MembershipListRouteResponse } from "@/app/api/membership.list/type";
import { Button } from "@/components/button/Button";

import type { TestMembershipType } from "../types/TestMembershipType";

interface MembershipCardProps {
    membership: MembershipListRouteResponse;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Last two digits
    return `${day}/${month}/${year}`;
}

export function MembershipCard({ membership }: MembershipCardProps) {
    let isActive = false;
    if (membership.status == "active") {
        isActive = true;
    }

    return (
        <div
            className={cn(
                `flex w-full flex-col gap-6 rounded-xl p-3`,
                isActive ? "border border-[#978FFE] bg-[#978FFE]/20" : "bg-gray",
            )}
        >
            <h1 className="text-xl font-bold">{membership.title}</h1>
            <p className="text-gray-400">{membership?.description && "No description"}</p>
            <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <p>MembershipId: {membership.id}</p>
                    <p>Purchased: {formatDate(membership.createdAt)}</p>
                    <p>Expiry: {formatDate(membership.endAt)}</p>
                </div>
                <div className="flex h-fit gap-2">
                    <Button
                        className={cn(
                            isActive ? "bg-[#00FF62]/10 text-[#00FF62]" : "text-gray-400",
                        )}
                        variant={{ style: "solid" }}
                    >
                        {isActive ? "Active" : "Expired"}
                    </Button>
                    <Button variant={{ style: "cta" }}>Open invoice</Button>
                </div>
            </div>
        </div>
    );
}
