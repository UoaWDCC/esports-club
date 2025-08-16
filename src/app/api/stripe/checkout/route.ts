// Stripe checkout API route for membership purchases
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@libs/auth/auth";
import { db } from "@libs/db";
import { profiles } from "@libs/db/schema";
import { env } from "@libs/env";
import { createCheckoutSession } from "@libs/stripe/checkout/createCheckoutSession";
import { eq } from "drizzle-orm";

/**
 * Create a Stripe checkout session for a membership purchase.
 * @param request NextRequest with JSON body (priceId, membershipTypeId)
 * @returns JSON with Stripe checkout URL or error
 */
export async function POST(request: NextRequest) {
    try {
        // Authenticate user
        const session = await getSession();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { priceId, membershipTypeId } = body;

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        if (!membershipTypeId) {
            return NextResponse.json({ error: "Membership type ID is required" }, { status: 400 });
        }

        // Get user profile for customer information
        const userProfile = await db.query.profiles.findFirst({
            where: eq(profiles.userId, session.user.id),
        });

        if (!userProfile) {
            return NextResponse.json({ error: "User profile not found" }, { status: 404 });
        }

        // Create Stripe checkout session
        const checkoutSession = await createCheckoutSession({
            profileId: userProfile.id,
            priceId,
            successUrl: `${env.APP_URL}/pricing?success=true`,
            cancelUrl: `${env.APP_URL}/pricing?cancelled=true`,
            membershipTypeId,
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("Checkout session creation failed:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
