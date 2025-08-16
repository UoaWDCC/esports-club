import { stripe } from "../client";

/**
 * Create a Stripe customer portal session.
 * @param customerId Stripe customer ID
 * @param returnUrl Redirect after portal
 * @returns Stripe portal session
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
    return session;
}
