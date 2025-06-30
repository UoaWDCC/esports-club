import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@libs/auth/auth";
import { db } from "@libs/db";
import { profiles } from "@libs/db/schema";
import { env } from "@libs/env";
import { createCheckoutSession } from "@libs/stripe/server";
import { eq } from "drizzle-orm";

import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession(request);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user already has an active membership
        const membershipStatus = await getMembershipStatus(session.user.id);
        if (membershipStatus.isValid) {
            return NextResponse.json(
                { error: "You already have an active membership" },
                { status: 403 },
            );
        }

        const formData = await request.formData();
        const priceId = formData.get("priceId") as string;

        if (!priceId) {
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        // Get user's profile
        const userProfile = await db
            .select()
            .from(profiles)
            .where(eq(profiles.userId, session.user.id))
            .limit(1);

        if (userProfile.length === 0) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const profile = userProfile[0];

        // Create checkout session
        const checkoutSession = await createCheckoutSession({
            profileId: profile.id,
            priceId,
            successUrl: `${env.APP_URL}/profile?success=true`,
            cancelUrl: `${env.APP_URL}/profile?canceled=true`,
        });

        // Return the checkout URL instead of redirecting
        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
