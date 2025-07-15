import { Button } from "@/components/button/Button";
import { cn } from "@libs/utils";
import { TestMembershipType } from "../types/TestMembershipType";

interface MembershipCardProps {
    membership: TestMembershipType;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Last two digits
    return `${day}/${month}/${year}`;
}

export function MembershipCard({ membership }: MembershipCardProps) {

    return <div className={cn(`
         gap-6 flex w-full max-w-[752px] flex-col rounded-xl  p-3`,
        membership.isActive ? "border border-[#978FFE] bg-[#978FFE]/20" : "bg-gray",
    ) }>
        <h1 className="text-xl font-bold">{membership.title}</h1>
        <p className="text-gray-400">{membership.description}</p>
        <div className="flex justify-between">
            <div className="flex flex-col">
            <p>MembershipId: {membership.id}</p>
            <p>Purchased: {formatDate(membership.purchaseDate)}</p>
            <p>Expiry: {formatDate(membership.expiryDate)}</p>
            </div>
            <div className="flex gap-2">
            <Button className="py-3 px-[10px]" variant={{ style: "solid" }}>Active</Button>
            <Button className="py-3 px-[10px]" variant={{ style: "cta" }}>Open invoice</Button>
            </div>
        </div>
    </div>;
}

