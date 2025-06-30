/**
 * Pricing Client Component
 *
 * This client component handles all the interactive UI elements for the pricing page.
 * It receives data from the server component and manages user interactions including
 * checkout flow, loading states, and conditional rendering based on membership status.
 *
 * Key Features:
 * - Displays pricing plans with dynamic data from Stripe
 * - Handles checkout process with error handling
 * - Shows membership status for users with active memberships
 * - Manages loading states during checkout
 * - Provides user-friendly error messages and redirects
 *
 * Component States:
 * 1. Active Membership: Shows membership details and prevents new purchases
 * 2. No Membership: Shows pricing plans for purchase
 * 3. Loading: Shows loading state during checkout process
 * 4. Error: Shows appropriate error messages for various scenarios
 */

"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

/**
 * TypeScript interfaces for type safety and data structure definition
 */

/** Stripe product information from the API */
interface StripeProduct {
    id: string;
    name: string;
    description: string;
}

/** Stripe price information with product details */
interface StripePrice {
    id: string;
    productId: string;
    unitAmount: number;
    currency: string;
    productName: string;
    productDescription: string;
}

/** Combined pricing data structure */
interface PricingData {
    prices: StripePrice[];
    products: StripeProduct[];
}

/** User membership status information */
interface MembershipStatus {
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

/** User session information */
interface Session {
    user?: {
        id: string;
        email?: string;
        name?: string;
    } | null;
}

/** Props for the PricingClient component */
interface PricingClientProps {
    pricingData: PricingData;
    membershipStatus: MembershipStatus | null;
    session: Session | null;
}

/**
 * PricingClient Component
 *
 * Main client component that handles the pricing page UI and interactions.
 *
 * This component:
 * 1. Receives data from the server component (pricing data, membership status, session)
 * 2. Manages checkout flow and loading states
 * 3. Conditionally renders content based on user's membership status
 * 4. Handles error scenarios and user feedback
 * 5. Provides interactive elements for membership purchase
 *
 * @param pricingData - Dynamic pricing information from Stripe
 * @param membershipStatus - User's current membership status
 * @param session - User's authentication session
 * @returns JSX element representing the pricing page UI
 */
export function PricingClient({ pricingData, membershipStatus, session }: PricingClientProps) {
    // State for managing loading states during checkout
    const [loading, setLoading] = useState<string | null>(null);

    /**
     * Handles the checkout process for membership purchases
     *
     * This function:
     * 1. Validates the price ID is available
     * 2. Sets loading state for the specific plan
     * 3. Sends checkout request to the API
     * 4. Handles various response scenarios (success, auth errors, etc.)
     * 5. Redirects to Stripe checkout or shows appropriate error messages
     *
     * @param priceId - The Stripe price ID for the selected plan
     * @param planName - The name of the plan for loading state management
     */
    const handleCheckout = async (priceId: string | undefined, planName: string) => {
        if (!priceId) {
            alert("Price ID not available. Please try again.");
            return;
        }

        setLoading(planName);

        try {
            // Prepare form data for the checkout API
            const formData = new FormData();
            formData.append("priceId", priceId);

            // Send checkout request to the API
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            // Handle authentication errors
            if (response.status === 401) {
                alert("Please sign in to purchase a membership.");
                window.location.href = "/sign-in?redirect=/pricing";
                return;
            }

            // Handle duplicate membership errors
            if (response.status === 403) {
                alert("You already have an active membership.");
                return;
            }

            // Handle successful checkout session creation
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

    // Conditional rendering: Show membership details if user has active membership
    if (membershipStatus?.isValid) {
        return (
            <PageLayout>
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">
                            You Already Have an Active Membership!
                        </h1>
                        <p className="mx-auto mb-6 max-w-2xl text-xl text-gray-600">
                            You currently have an active {membershipStatus.membershipType?.name}{" "}
                            membership.
                        </p>
                        <div className="mx-auto max-w-md rounded-lg border border-green-200 bg-green-50 p-6">
                            <h3 className="mb-2 text-lg font-semibold text-green-800">
                                Membership Details
                            </h3>
                            <p className="mb-2 text-green-700">
                                <strong>Plan:</strong> {membershipStatus.membershipType?.name}
                            </p>
                            <p className="mb-2 text-green-700">
                                <strong>Valid until:</strong>{" "}
                                {membershipStatus.membershipType?.endAt.toLocaleDateString()}
                            </p>
                            <p className="text-green-700">
                                <strong>Status:</strong> Active
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button href="/profile" className="mr-4">
                                View Profile
                            </Button>
                            <Button href="/" variant={{ style: "solid" }}>
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Extract pricing data for plan generation
    const { prices, products } = pricingData;

    // Find the specific semester plans from the products array
    const oneSemesterPlan = products.find(
        (product: StripeProduct) => product.name === "1 Semester Plan",
    );
    const twoSemesterPlan = products.find(
        (product: StripeProduct) => product.name === "2 Semester Plan",
    );

    // Find the corresponding prices for each plan
    const oneSemesterPrice = prices.find(
        (price: StripePrice) => price.productId === oneSemesterPlan?.id,
    );
    const twoSemesterPrice = prices.find(
        (price: StripePrice) => price.productId === twoSemesterPlan?.id,
    );

    // Define the pricing plans with features and fallback values
    const pricingPlans = [
        {
            id: "1-semester",
            name: oneSemesterPlan?.name || "1 Semester Plan",
            price: oneSemesterPrice?.unitAmount || 5000,
            description: "Access to all esports club activities for one semester",
            features: [
                "Access to all gaming tournaments",
                "Club facilities access",
                "Team practice sessions",
                "Esports workshops",
                "Club events and socials",
                "Discord server access",
            ],
            priceId: oneSemesterPrice?.id,
        },
        {
            id: "2-semester",
            name: twoSemesterPlan?.name || "2 Semester Plan",
            price: twoSemesterPrice?.unitAmount || 9000,
            description: "Access to all esports club activities for two semesters",
            features: [
                "Everything in 1 Semester Plan, plus:",
                "Priority tournament registration",
                "Extended facility access hours",
                "Exclusive training sessions",
                "Mentorship opportunities",
                "Club leadership roles eligibility",
                "Discounted merchandise",
            ],
            priceId: twoSemesterPrice?.id,
        },
    ];

    // Render the pricing plans for users without active memberships
    return (
        <PageLayout>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        Choose Your Membership Plan
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                        Join the esports club and unlock access to tournaments, facilities, and a
                        community of gamers.
                    </p>
                    {!session?.user && (
                        <p className="mt-2 text-sm text-gray-500">
                            Please sign in to purchase a membership.
                        </p>
                    )}
                </div>

                <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg"
                        >
                            <div className="mb-6 text-center">
                                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                    {plan.name}
                                </h2>
                                <p className="mb-4 text-gray-600">{plan.description}</p>
                                <div className="mb-2 text-4xl font-bold text-gray-900">
                                    ${(plan.price / 100).toFixed(2)}
                                </div>
                                <p className="text-sm text-gray-500">One-time payment</p>
                            </div>

                            <ul className="mb-8 space-y-4">
                                {plan.features.map((feature: string, index: number) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => handleCheckout(plan.priceId, plan.name)}
                                disabled={!plan.priceId || loading === plan.name || !session?.user}
                                className="w-full"
                            >
                                {loading === plan.name
                                    ? "Processing..."
                                    : !session?.user
                                      ? "Sign in to Purchase"
                                      : plan.priceId
                                        ? `Join ${plan.name}`
                                        : "Coming Soon"}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600">
                        Have questions about membership?{" "}
                        <a
                            href="mailto:esports@wdcc.co.nz"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Contact us
                        </a>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
