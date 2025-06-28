import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@libs/auth/auth";
import { db } from "@libs/db";
import { profiles } from "@libs/db/schema";
import { createCheckoutSession } from "@libs/stripe/server";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession(request);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
            successUrl: `${process.env.APP_URL}/profile?success=true`,
            cancelUrl: `${process.env.APP_URL}/profile?canceled=true`,
        });

        // Redirect to Stripe checkout
        redirect(checkoutSession.url!);
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
