import { MembershipType } from "@libs/types/membershipType.type";
import { Calendar, Loader2 } from "lucide-react";

import { Button } from "@/components/button/Button";

interface MembershipCardProps {
    membership: MembershipType;
    formatPrice: (price: number) => string;
    formatDate: (date: Date) => string;
    isLoading: boolean;
    loadingMembershipId: string | null;
    onPurchase: (id: string, stripePriceId: string) => void;
}

export function MembershipCard({
    membership,
    formatPrice,
    formatDate,
    isLoading,
    loadingMembershipId,
    onPurchase,
}: MembershipCardProps) {
    const isLoadingCard = loadingMembershipId === membership.id;
    const isAvailable = !!membership.stripePriceId;

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="p-6 text-center">
                <h3 className="text-muted mb-2 text-xl font-semibold">{membership.name}</h3>
                {membership.description && (
                    <p className="text-sm text-gray-600">{membership.description}</p>
                )}
            </div>

            <div className="px-6 text-center">
                <p className="mb-4 text-3xl font-bold text-gray-900">
                    {formatPrice(membership.price)}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Valid from {formatDate(membership.startAt)}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Until {formatDate(membership.endAt)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto p-6">
                <Button
                    onClick={() => onPurchase(membership.id, membership.stripePriceId || "")}
                    disabled={isLoading || !isAvailable}
                    className="w-full"
                >
                    {isLoadingCard ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </div>
                    ) : !isAvailable ? (
                        "Coming Soon"
                    ) : (
                        "Purchase Membership"
                    )}
                </Button>

                {!isAvailable && (
                    <p className="mt-2 text-center text-xs text-gray-500">
                        Payment setup in progress
                    </p>
                )}
            </div>
        </div>
    );
}
