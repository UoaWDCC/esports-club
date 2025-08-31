import { MembershipType } from "@libs/types/membershipType.type";

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
    return (
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
            <div className="text-center">
                {/* Title */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{membership.name}</h3>

                {/* Description */}
                {membership.description && (
                    <p className="mb-4 text-gray-600">{membership.description}</p>
                )}

                {/* Price */}
                <div className="mb-6 text-4xl font-bold text-gray-900">
                    {formatPrice(membership.price)}
                </div>

                {/* Dates */}
                <div className="mb-6 space-y-1 text-sm text-gray-600">
                    <p>Valid from: {formatDate(membership.startAt)}</p>
                    <p>Valid until: {formatDate(membership.endAt)}</p>
                </div>

                {/* Purchase button */}
                <Button
                    onClick={() => onPurchase(membership.id, membership.stripePriceId || "")}
                    disabled={isLoading || !membership.stripePriceId}
                    className="mt-auto w-full"
                >
                    {loadingMembershipId === membership.id
                        ? "Processing..."
                        : !membership.stripePriceId
                          ? "Coming Soon"
                          : "Purchase Membership"}
                </Button>

                {/* Helper note if not ready */}
                {!membership.stripePriceId && (
                    <p className="mt-2 text-xs text-gray-500">Payment setup in progress</p>
                )}
            </div>
        </div>
    );
}
