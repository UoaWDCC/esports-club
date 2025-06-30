/**
 * Stripe Checkout API Route
 *
 * This API endpoint handles the creation of Stripe checkout sessions for membership purchases.
 * It validates user authentication, checks for existing memberships, and creates a secure
 * checkout session for one-time payments.
 *
 * Endpoint: POST /api/stripe/checkout
 *
 * Security Features:
 * - Requires user authentication
 * - Prevents duplicate membership purchases
 * - Validates user profile existence
 * - Uses server-side Stripe integration for security
 *
 * Request Format:
 * FormData with:
 * - priceId: string (Stripe price ID for the selected membership plan)
 *
 * Response Format:
 * Success: { url: string } - Stripe checkout URL
 * Error: { error: string } - Error message
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@libs/auth/auth";
import { db } from "@libs/db";
import { profiles } from "@libs/db/schema";
import { env } from "@libs/env";
import { createCheckoutSession } from "@libs/stripe/server";
import { eq } from "drizzle-orm";

import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe checkout session for membership purchase.
 *
 * This endpoint performs several security checks:
 * 1. Verifies user is authenticated
 * 2. Checks if user already has an active membership (prevents duplicates)
 * 3. Validates the provided price ID
 * 4. Ensures user has a profile in the database
 *
 * If all checks pass, it creates a Stripe checkout session with:
 * - One-time payment mode for semester memberships
 * - User profile ID for tracking
 * - Success/cancel URLs for post-payment flow
 * - Metadata for webhook processing
 *
 * @param request - NextRequest containing form data with priceId
 * @returns JSON response with Stripe checkout URL or error message
 * @throws 401 if user is not authenticated
 * @throws 403 if user already has active membership
 * @throws 400 if priceId is missing
 * @throws 404 if user profile not found
 * @throws 500 for internal server errors
 */
export async function POST(request: NextRequest) {
    try {
        // Step 1: Authenticate the user
        const session = await getSession(request);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Check if user already has an active membership to prevent duplicates
        const membershipStatus = await getMembershipStatus(session.user.id);
        if (membershipStatus.isValid) {
            return NextResponse.json(
                { error: "You already have an active membership" },
                { status: 403 },
            );
        }

        // Step 3: Extract and validate the price ID from form data
        const formData = await request.formData();
        const priceId = formData.get("priceId") as string;

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        // Step 4: Get user's profile from database
        const userProfile = await db
            .select()
            .from(profiles)
            .where(eq(profiles.userId, session.user.id))
            .limit(1);

        if (userProfile.length === 0) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const profile = userProfile[0];

        // Step 5: Create Stripe checkout session with user's profile and selected price
        const checkoutSession = await createCheckoutSession({
            profileId: profile.id,
            priceId,
            successUrl: `${env.APP_URL}/profile?success=true`,
            cancelUrl: `${env.APP_URL}/profile?canceled=true`,
        });

        // Step 6: Return the checkout URL for client-side redirect
        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
