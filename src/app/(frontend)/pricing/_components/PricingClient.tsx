/**
 * Pricing Client Component
 *
 * This client component handles the pricing page UI for membership purchases.
 * It fetches user memberships and available membership types using React Query,
 * then shows existing memberships or displays available membership types for purchase.
 */

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MembershipType } from "@libs/types/membershipType.type";
import { AlertCircle, Check, CheckCircle, Clock, Loader2, XCircle } from "lucide-react";

import { useMembershipTypeListQuery } from "@/app/api/membership-type.list/query";
import { useMembershipListQueryWithFilters } from "@/app/api/membership.list/query";
import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

interface Session {
    user?: {
        id: string;
        email?: string;
        name?: string;
    };
}

interface PricingClientProps {
    session: Session;
}

export function PricingClient({ session }: PricingClientProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMembershipId, setLoadingMembershipId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    // Check for success or cancellation parameters
    const isSuccess = searchParams.get("success") === "true";
    const isCancelled = searchParams.get("cancelled") === "true";

    // Check if user has active approved memberships
    const {
        data: activeMemberships = [],
        isLoading: isLoadingMemberships,
        error: membershipError,
        refetch: refetchMemberships,
    } = useMembershipListQueryWithFilters(
        session.user?.id || "",
        "active",
        "approved",
        !!session.user?.id,
    );

    // Refetch memberships when returning from successful payment
    useEffect(() => {
        if (isSuccess) {
            console.log("🔄 Payment success detected, refetching memberships...");
            // Wait a bit for the webhook to process, then refetch
            setTimeout(() => {
                refetchMemberships();
            }, 2000);
        }
    }, [isSuccess, refetchMemberships]);

    // Fetch available membership types
    const {
        data: membershipTypesData,
        isLoading: isLoadingMembershipTypes,
        error: membershipTypesError,
    } = useMembershipTypeListQuery(false); // Only active membership types

    const hasActiveMembership = activeMemberships.length > 0;
    const activeMembership = hasActiveMembership ? activeMemberships[0] : null;
    const membershipTypes: MembershipType[] = membershipTypesData?.data || [];

    // Loading state
    if (isLoadingMemberships || isLoadingMembershipTypes) {
        return (
            <PageLayout>
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="mr-3 h-8 w-8 animate-spin text-gray-600" />
                        <p className="text-lg text-gray-600">Loading membership information...</p>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Error state
    if (membershipError || membershipTypesError) {
        return (
            <PageLayout>
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-12">
                        <AlertCircle className="mr-3 h-8 w-8 text-red-600" />
                        <div className="text-center">
                            <p className="mb-2 text-lg font-semibold text-red-600">
                                Failed to load membership information
                            </p>
                            <p className="text-gray-600">
                                Please try refreshing the page or contact support if the problem
                                persists.
                            </p>
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    const handlePurchase = async (membershipTypeId: string, stripePriceId: string) => {
        if (!stripePriceId) {
            alert(
                "This membership type is not available for purchase yet. Please contact support.",
            );
            return;
        }

        console.log("🛒 Starting checkout process:", { membershipTypeId, stripePriceId });
        setIsLoading(true);
        setLoadingMembershipId(membershipTypeId);

        try {
            console.log("📡 Sending checkout request...");
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
            console.log("📡 Checkout response:", { status: response.status, data });

            if (!response.ok) {
                throw new Error(data.error || "Failed to create checkout session");
            }

            console.log("🔗 Redirecting to Stripe Checkout:", data.url);
            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch (error) {
            console.error("❌ Checkout error:", error);
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

                {/* Status Messages */}
                {isSuccess && (
                    <div className="mx-auto mb-8 max-w-md rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex items-center">
                            <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
                            <div>
                                <h3 className="text-sm font-medium text-green-800">
                                    Payment Successful!
                                </h3>
                                <p className="text-sm text-green-700">
                                    Your membership is being processed. Please refresh the page in a
                                    few moments.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {isCancelled && (
                    <div className="mx-auto mb-8 max-w-md rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <div className="flex items-center">
                            <XCircle className="mr-3 h-5 w-5 text-yellow-600" />
                            <div>
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Payment Cancelled
                                </h3>
                                <p className="text-sm text-yellow-700">
                                    Your payment was cancelled. You can try again below.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

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
