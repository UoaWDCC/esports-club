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
import { AlertCircle, Check, Loader2 } from "lucide-react";

import { useMembershipTypeListQuery } from "@/app/api/membership-type.list/query";
import { useMembershipListQueryWithFilters } from "@/app/api/membership.list/query";
import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

import { MembershipCard } from "./MembershipCard";
import { StatusMessage } from "./StatusMessage";

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
                <div className="flex min-h-[40vh] items-center justify-center">
                    <Loader2 className="mr-3 h-8 w-8 animate-spin text-gray-600" />
                    <p className="text-lg text-gray-600">Loading membership information...</p>
                </div>
            </PageLayout>
        );
    }

    // Error state
    if (membershipError || membershipTypesError) {
        return (
            <PageLayout>
                <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                    <AlertCircle className="mb-2 h-10 w-10 text-red-600" />
                    <p className="mb-1 text-lg font-semibold text-red-600">
                        Failed to load membership information
                    </p>
                    <p className="text-gray-600">
                        Please refresh the page or contact support if the problem persists.
                    </p>
                </div>
            </PageLayout>
        );
    }

    const handlePurchase = async (membershipTypeId: string, stripePriceId: string) => {
        if (!stripePriceId) {
            alert("This membership type is not available yet. Please contact support.");
            return;
        }

        console.log("🛒 Starting checkout process:", { membershipTypeId, stripePriceId });
        setIsLoading(true);
        setLoadingMembershipId(membershipTypeId);

        try {
            console.log("📡 Sending checkout request...");
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId: stripePriceId, membershipTypeId }),
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
            alert(error instanceof Error ? error.message : "Failed to start checkout process");
        } finally {
            setIsLoading(false);
            setLoadingMembershipId(null);
        }
    };

    // Helpers
    const formatPrice = (priceInCents: number) => `$${(priceInCents / 100).toFixed(2)}`;

    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    // If user already has a membership
    if (hasActiveMembership && activeMembership) {
        return (
            <PageLayout>
                <div className="mx-auto max-w-3xl py-12">
                    <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
                        You Already Have an Active Membership
                    </h1>
                    <p className="mb-8 text-center text-gray-600">
                        You currently have an active{" "}
                        <span className="font-semibold">{activeMembership.title}</span> membership.
                    </p>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
                        <div className="mb-4 flex items-center">
                            <Check className="mr-2 h-6 w-6 text-green-600" />
                            <h2 className="text-xl font-semibold text-green-900">
                                Active Membership
                            </h2>
                        </div>
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <InfoItem label="Type" value={activeMembership.title} />
                            <InfoItem
                                label="Price Paid"
                                value={formatPrice(activeMembership.price)}
                            />
                            <InfoItem
                                label="Valid From"
                                value={formatDate(activeMembership.startAt)}
                            />
                            <InfoItem
                                label="Valid Until"
                                value={formatDate(activeMembership.endAt)}
                            />
                        </dl>
                    </div>

                    <div className="mt-8 text-center">
                        <Button href="/profile">View Profile</Button>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Membership selection page
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
                    <StatusMessage
                        type="success"
                        title="Payment Successful!"
                        message="Your membership is being processed. Please refresh the page shortly."
                    />
                )}
                {isCancelled && (
                    <StatusMessage
                        type="warning"
                        title="Payment Cancelled"
                        message="Your payment was cancelled. You can try again below."
                    />
                )}

                {/* Membership cards */}
                {membershipTypes.length === 0 ? (
                    <StatusMessage
                        type="info"
                        title="No Memberships Available"
                        message="We’re currently updating our membership options. Please check back soon!"
                    />
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {membershipTypes.map((m) => (
                            <MembershipCard
                                key={m.id}
                                membership={m}
                                formatPrice={formatPrice}
                                formatDate={formatDate}
                                isLoading={isLoading}
                                loadingMembershipId={loadingMembershipId}
                                onPurchase={handlePurchase}
                            />
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
