import { Check } from "lucide-react";

import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

import type { PricingData, ProductPricingData, Session, StripeProduct } from "./PricingClient";

interface Props {
    pricingData: PricingData;
    session: Session | null;
    handleCheckout: (priceId: string | undefined, planName: string) => void;
    loading: string | null;
}

export function PricingClientNoMembership({
    pricingData,
    session,
    handleCheckout,
    loading,
}: Props) {
    const { prices, products } = pricingData;
    const oneSemesterPlan = products.find(
        (product: StripeProduct) => product.name === "1 Semester Plan",
    );
    const twoSemesterPlan = products.find(
        (product: StripeProduct) => product.name === "2 Semester Plan",
    );
    const oneSemesterPrice = prices.find(
        (price: ProductPricingData) => price.productId === oneSemesterPlan?.id,
    );
    const twoSemesterPrice = prices.find(
        (price: ProductPricingData) => price.productId === twoSemesterPlan?.id,
    );
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
