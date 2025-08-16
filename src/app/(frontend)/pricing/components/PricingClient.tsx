"use client";

import { useState } from "react";

import { PricingClientNoMembership } from "./PricingClientNoMembership";
import { PricingClientWithMembership } from "./PricingClientWithMembership";

export interface StripeProduct {
    id: string;
    name: string;
    description: string;
}

export interface ProductPricingData {
    id: string;
    productId: string;
    unitAmount: number;
    currency: string;
    productName: string;
    productDescription: string;
}

export interface PricingData {
    prices: ProductPricingData[];
    products: StripeProduct[];
}

export interface MembershipStatus {
    isValid: boolean;
    membership?: {
        id: string;
        membershipTypeId: string;
        isPaid: boolean;
        createdAt: Date;
    };
    membershipType?: {
        id: string;
        name: string;
        description?: string;
        startAt: Date;
        endAt: Date;
        price: number;
    };
    error?: string;
}

export interface Session {
    user?: {
        id: string;
        email?: string;
        name?: string;
    } | null;
}

export interface PricingClientProps {
    pricingData: PricingData;
    membershipStatus: MembershipStatus | null;
    session: Session | null;
}

export function PricingClient({ pricingData, membershipStatus, session }: PricingClientProps) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (priceId: string | undefined, planName: string) => {
        if (!priceId) {
            alert("Price ID not available. Please try again.");
            return;
        }
        setLoading(planName);
        try {
            const formData = new FormData();
            formData.append("priceId", priceId);
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.status === 401) {
                alert("Please sign in to purchase a membership.");
                window.location.href = "/sign-in?redirect=/pricing";
                return;
            }
            if (response.status === 403) {
                alert("You already have an active membership.");
                return;
            }
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Failed to create checkout session");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Failed to start checkout. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    if (membershipStatus?.isValid) {
        return (
            <PricingClientWithMembership membershipStatus={membershipStatus} session={session} />
        );
    }
    return (
        <PricingClientNoMembership
            pricingData={pricingData}
            session={session}
            handleCheckout={handleCheckout}
            loading={loading}
        />
    );
}
