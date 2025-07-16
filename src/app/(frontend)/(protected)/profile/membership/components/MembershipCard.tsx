import { cn } from "@libs/utils";

import { Button } from "@/components/button/Button";

import { TestMembershipType } from "../types/TestMembershipType";

interface MembershipCardProps {
    membership: TestMembershipType;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Last two digits
    return `${day}/${month}/${year}`;
}

export function MembershipCard({ membership }: MembershipCardProps) {
    return (
        <div
            className={cn(
                `flex w-full max-w-[752px] flex-col gap-6 rounded-xl p-3`,
                membership.isActive ? "border border-[#978FFE] bg-[#978FFE]/20" : "bg-gray",
            )}
        >
            <h1 className="text-xl font-bold">{membership.title}</h1>
            <p className="text-gray-400">{membership.description}</p>
            <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <p>MembershipId: {membership.id}</p>
                    <p>Purchased: {formatDate(membership.purchaseDate)}</p>
                    <p>Expiry: {formatDate(membership.expiryDate)}</p>
                </div>
                <div className="flex h-fit gap-2">
                    <Button
                        className={cn(
                            `px-[10px] py-3`,
                            membership.isActive
                                ? "bg-[#00FF62]/10 text-[#00FF62]"
                                : "text-gray-400",
                        )}
                        variant={{ style: "solid" }}
                    >
                        {membership.isActive ? "Active" : "Expired"}
                    </Button>
                    <Button className="px-[10px] py-3" variant={{ style: "cta" }}>
                        Open invoice
                    </Button>
                </div>
            </div>
        </div>
    );
}
