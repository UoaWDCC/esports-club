/**
 * Pricing Client Component
 *
 * This client component handles the pricing page UI for membership purchases.
 * It shows existing memberships if the user has them, or displays available
 * membership types for purchase.
 */

"use client";

import { useState } from "react";
import { Check, Clock } from "lucide-react";

import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

interface MembershipType {
    id: string;
    name: string;
    description?: string;
    price: number;
    startAt: Date;
    endAt: Date;
    isActive: boolean;
    stripeProductId?: string;
    stripePriceId?: string;
}

interface ActiveMembership {
    id: string;
    membershipTypeId: string;
    status: string;
    state: string;
    title: string;
    description: string;
    price: number;
    startAt: Date;
    endAt: Date;
}

interface Session {
    user?: {
        id: string;
        email?: string;
        name?: string;
    };
}

interface PricingClientProps {
    hasActiveMembership: boolean;
    activeMembership: ActiveMembership | null;
    membershipTypes: MembershipType[];
    session: Session;
}

export function PricingClient({
    hasActiveMembership,
    activeMembership,
    membershipTypes,
}: PricingClientProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMembershipId, setLoadingMembershipId] = useState<string | null>(null);

    const handlePurchase = async (membershipTypeId: string, stripePriceId: string) => {
        if (!stripePriceId) {
            alert(
                "This membership type is not available for purchase yet. Please contact support.",
            );
            return;
        }

        setIsLoading(true);
        setLoadingMembershipId(membershipTypeId);

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId: stripePriceId,
                    membershipTypeId: membershipTypeId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create checkout session");
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch (error) {
            console.error("Checkout error:", error);
            alert(error instanceof Error ? error.message : "Failed to start checkout process");
        } finally {
            setIsLoading(false);
            setLoadingMembershipId(null);
        }
    };

    const formatPrice = (priceInCents: number) => {
        return `$${(priceInCents / 100).toFixed(2)}`;
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (hasActiveMembership && activeMembership) {
        return (
            <PageLayout>
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">
                            You Already Have an Active Membership!
                        </h1>
                        <p className="mx-auto mb-6 max-w-2xl text-xl text-gray-600">
                            You currently have an active {activeMembership.title} membership.
                        </p>
                    </div>

                    <div className="mx-auto max-w-md">
                        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                            <div className="mb-4 flex items-center">
                                <Check className="mr-2 h-6 w-6 text-green-600" />
                                <h2 className="text-xl font-semibold text-green-900">
                                    Active Membership
                                </h2>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-green-800">
                                        Membership Type
                                    </p>
                                    <p className="text-lg text-green-900">
                                        {activeMembership.title}
                                    </p>
                                </div>

                                {activeMembership.description && (
                                    <div>
                                        <p className="text-sm font-medium text-green-800">
                                            Description
                                        </p>
                                        <p className="text-green-900">
                                            {activeMembership.description}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-medium text-green-800">Price Paid</p>
                                    <p className="text-lg font-semibold text-green-900">
                                        {formatPrice(activeMembership.price)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-green-800">Valid From</p>
                                    <p className="text-green-900">
                                        {formatDate(activeMembership.startAt)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-green-800">
                                        Valid Until
                                    </p>
                                    <p className="text-green-900">
                                        {formatDate(activeMembership.endAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Button href="/profile">View Profile</Button>
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        Choose Your Membership
                    </h1>
                    <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
                        Select a membership plan that works best for you. All memberships include
                        full access to our facilities and events.
                    </p>
                </div>

                {membershipTypes.length === 0 ? (
                    <div className="py-12 text-center">
                        <Clock className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No Memberships Available
                        </h3>
                        <p className="text-gray-600">
                            We&apos;re currently updating our membership options. Please check back
                            soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3 lg:gap-x-8">
                        {membershipTypes.map((membershipType) => (
                            <div
                                key={membershipType.id}
                                className="relative rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="text-center">
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                        {membershipType.name}
                                    </h3>

                                    {membershipType.description && (
                                        <p className="mb-4 text-gray-600">
                                            {membershipType.description}
                                        </p>
                                    )}

                                    <div className="mb-6">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {formatPrice(membershipType.price)}
                                        </span>
                                    </div>

                                    <div className="mb-6 space-y-2">
                                        <div className="text-sm text-gray-600">
                                            <p>Valid from: {formatDate(membershipType.startAt)}</p>
                                            <p>Valid until: {formatDate(membershipType.endAt)}</p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() =>
                                            handlePurchase(
                                                membershipType.id,
                                                membershipType.stripePriceId || "",
                                            )
                                        }
                                        disabled={isLoading || !membershipType.stripePriceId}
                                        className="w-full"
                                    >
                                        {loadingMembershipId === membershipType.id
                                            ? "Processing..."
                                            : !membershipType.stripePriceId
                                              ? "Coming Soon"
                                              : "Purchase Membership"}
                                    </Button>

                                    {!membershipType.stripePriceId && (
                                        <p className="mt-2 text-xs text-gray-500">
                                            Payment setup in progress
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
