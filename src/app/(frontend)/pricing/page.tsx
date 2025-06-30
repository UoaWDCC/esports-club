/**
 * Pricing Page Server Component
 *
 * This server component handles the server-side data fetching for the pricing page.
 * It fetches Stripe pricing information and user membership status, then passes
 * this data to the client component for rendering.
 *
 * Key Features:
 * - Server-side authentication using getSession()
 * - Fetches dynamic pricing data from Stripe API
 * - Checks user's current membership status
 * - Prevents access to pricing for users with active memberships
 * - Optimized data fetching with parallel requests
 *
 * Architecture:
 * This component follows Next.js 13+ App Router patterns by separating
 * server-side data fetching from client-side interactions. The server
 * component handles all data fetching and authentication, while the
 * client component handles UI interactions and state management.
 */

import { getSession } from "@libs/auth/auth";

import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

import { PricingClient } from "./PricingClient";

/**
 * Fetches pricing data from the Stripe API
 *
 * This function retrieves all active Stripe products and prices for display
 * on the pricing page. It uses the internal API route to get formatted
 * pricing information without exposing Stripe credentials to the client.
 *
 * The function uses cache: "no-store" to ensure fresh pricing data on each
 * request, allowing for dynamic price updates without code changes.
 *
 * @returns Promise containing pricing data with products and prices arrays
 * @throws Error if the API request fails
 */
async function getPricingData() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/stripe/prices`, {
        cache: "no-store", // Ensure fresh pricing data
    });

    if (!response.ok) {
        throw new Error("Failed to fetch pricing data");
    }

    return response.json();
}

/**
 * Pricing Page Server Component
 *
 * This is the main server component for the pricing page that:
 * 1. Authenticates the user using server-side session handling
 * 2. Fetches dynamic pricing data from Stripe
 * 3. Checks the user's current membership status
 * 4. Passes all data to the client component for rendering
 *
 * The component uses Promise.all for parallel data fetching to optimize
 * performance. It only checks membership status if the user is authenticated
 * to avoid unnecessary database queries.
 *
 * @returns PricingClient component with fetched data as props
 */
export default async function PricingPage() {
    // Step 1: Get the user's session for authentication
    const session = await getSession();

    // Step 2: Fetch data in parallel for optimal performance
    const [pricingData, membershipStatus] = await Promise.all([
        getPricingData(),
        // Only check membership status if user is authenticated
        session?.user?.id ? getMembershipStatus(session.user.id) : null,
    ]);

    // Step 3: Render the client component with all fetched data
    return (
        <PricingClient
            pricingData={pricingData}
            membershipStatus={membershipStatus}
            session={session}
        />
    );
}
