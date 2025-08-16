import { stripe } from "../client";

/**
 * Create a Stripe checkout session for a membership purchase.
 * @param profileId User's profile ID
 * @param priceId Stripe price ID
 * @param successUrl Redirect after payment
 * @param cancelUrl Redirect if cancelled
 * @returns Stripe checkout session
 */
export async function createCheckoutSession({
    profileId,
    priceId,
    successUrl,
    cancelUrl,
}: {
    profileId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}) {
    // One-time payment for semester plans
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "payment", // one-time
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: profileId, // for webhooks
        allow_promotion_codes: true,
        metadata: {
            profileId,
            type: "semester_membership",
        },
    });
    return session;
}
