import { getSession } from "@libs/auth/auth";

import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

import { PricingClient } from "./PricingClient";

async function getPricingData() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/stripe/prices`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch pricing data");
    }

    return response.json();
}

export default async function PricingPage() {
    const session = await getSession();

    // Fetch data in parallel
    const [pricingData, membershipStatus] = await Promise.all([
        getPricingData(),
        session?.user?.id ? getMembershipStatus(session.user.id) : null,
    ]);

    return (
        <PricingClient
            pricingData={pricingData}
            membershipStatus={membershipStatus}
            session={session}
        />
    );
}
