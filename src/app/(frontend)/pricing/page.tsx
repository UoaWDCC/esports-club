/**
 * Pricing Page Server Component
 *
 * This server component handles authentication and renders the pricing client.
 * All data fetching is now handled client-side using React Query for better
 * performance and user experience.
 */

import { redirect } from "next/navigation";
import { getSession } from "@libs/auth/auth";

import { PricingClient } from "@/app/(frontend)/pricing/_components/PricingClient";

/**
 * Pricing Page Server Component
 */
export default async function PricingPage() {
    // Get the user's session for authentication
    const session = await getSession();

    if (!session?.user?.id) {
        redirect("/auth/sign-in");
    }

    return <PricingClient session={session} />;
}
