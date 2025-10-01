"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MembershipType } from "@libs/types/membershipType.type";
import { AlertCircle, Check, Loader2 } from "lucide-react";

import { useMembershipTypeListQuery } from "@/app/api/membership-type.list/query";
import { useMembershipListQueryWithFilters } from "@/app/api/membership.list/query";
import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

import { InfoItem } from "./InfoItem";
import { MembershipCard } from "./MembershipCard";
import { StatusMessage } from "./StatusMessage";

interface Session {
    user?: { id: string; email?: string; name?: string };
}

interface PricingClientProps {
    session: Session;
}

export function PricingClient({ session }: PricingClientProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMembershipId, setLoadingMembershipId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const isSuccess = searchParams.get("success") === "true";
    const isCancelled = searchParams.get("cancelled") === "true";

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

    useEffect(() => {
        if (isSuccess) {
            // Allow webhook to update
            setTimeout(() => refetchMemberships(), 2000);
        }
    }, [isSuccess, refetchMemberships]);

    const {
        data: membershipTypesData,
        isLoading: isLoadingMembershipTypes,
        error: membershipTypesError,
    } = useMembershipTypeListQuery(false);

    const membershipTypes: MembershipType[] = membershipTypesData?.data || [];
    const activeMembership = activeMemberships[0] ?? null;

    const isLoadingData = isLoadingMemberships || isLoadingMembershipTypes;
    const hasError = membershipError || membershipTypesError;

    // Helpers
    const formatPrice = (priceInCents: number) => `$${(priceInCents / 100).toFixed(2)}`;
    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const handlePurchase = async (membershipTypeId: string, stripePriceId: string) => {
        if (!stripePriceId) {
            alert("This membership type is not available yet. Please contact support.");
            return;
        }

        setIsLoading(true);
        setLoadingMembershipId(membershipTypeId);

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId: stripePriceId, membershipTypeId }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to create checkout session");

            window.location.href = data.url;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Checkout failed";
            alert(message);
        } finally {
            setIsLoading(false);
            setLoadingMembershipId(null);
        }
    };

    /** ---------- Render States ---------- */

    if (isLoadingData) {
        return (
            <PageLayout>
                <div className="flex min-h-[50vh] items-center justify-center text-gray-600">
                    <Loader2 className="mr-3 h-10 w-10 animate-spin" />
                    <span>Loading membership information...</span>
                </div>
            </PageLayout>
        );
    }

    if (hasError) {
        return (
            <PageLayout>
                <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                    <AlertCircle className="mb-4 h-12 w-12 text-red-600" />
                    <h2 className="mb-2 text-xl font-semibold text-red-600">
                        Failed to load membership information
                    </h2>
                    <p className="mb-6 max-w-md text-gray-600">
                        Please refresh the page or contact support if the problem persists.
                    </p>
                    <Button onClick={() => window.location.reload()}>Refresh</Button>
                </div>
            </PageLayout>
        );
    }

    if (activeMembership) {
        return (
            <PageLayout>
                <div className="mx-auto max-w-4xl px-4 py-12">
                    <div className="mb-12 text-center">
                        <h1 className="mb-3 text-4xl font-bold text-gray-900">Active Membership</h1>
                        <p className="text-gray-600">
                            You currently have an active{" "}
                            <span className="font-semibold text-gray-900">
                                {activeMembership.title}
                            </span>{" "}
                            membership.
                        </p>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-8 shadow-sm">
                        <div className="mb-6 flex justify-center">
                            <div className="flex items-center rounded-full bg-green-100 px-4 py-2">
                                <Check className="mr-2 h-5 w-5 text-green-600" />
                                <span className="font-semibold text-green-900">
                                    Active Membership
                                </span>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

    return (
        <PageLayout>
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-cta mb-4 text-4xl font-bold sm:text-5xl">
                        Choose Your Membership
                    </h1>
                    <p className="text-cta-foreground mx-auto max-w-2xl">
                        Select a plan that works best for you. All memberships include full access
                        to our facilities and events.
                    </p>
                </div>

                <div className="mb-8">
                    {isSuccess && (
                        <StatusMessage
                            type="success"
                            title="Payment Successful!"
                            message="Your membership is being processed. Please refresh shortly."
                        />
                    )}
                    {isCancelled && (
                        <StatusMessage
                            type="warning"
                            title="Payment Cancelled"
                            message="Your payment was cancelled. You can try again below."
                        />
                    )}
                </div>

                {membershipTypes.length === 0 ? (
                    <StatusMessage
                        type="info"
                        title="No Memberships Available"
                        message="We're updating our membership options. Please check back soon!"
                    />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
