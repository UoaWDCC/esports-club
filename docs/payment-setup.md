# Payment System Setup Guide

This guide will help you set up Stripe payments for the esports club with 1-semester and 2-semester membership plans.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Your Stripe API keys
3. Node.js and pnpm installed

## Step 1: Environment Variables

Add these environment variables to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Your Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_... # Will be generated in step 3
```

## Step 2: Create Stripe Products and Prices

Run the setup script to create the products and prices in Stripe:

```bash
cd esports-club
node scripts/setup-stripe.js
```

This will create:

-   1 Semester Plan product
-   2 Semester Plan product
-   Corresponding prices for each plan

The pricing page will automatically fetch these prices from Stripe, so no additional configuration is needed!

## Step 3: Set Up Stripe Webhook

1. Go to your Stripe Dashboard
2. Navigate to Developers > Webhooks
3. Click "Add endpoint"
4. Set the endpoint URL to: `https://your-domain.com/api/stripe/webhook`
5. Select the `checkout.session.completed` event
6. Copy the webhook signing secret and add it to your `STRIPE_WEBHOOK_SECRET` environment variable

## Step 4: Seed Database with Membership Types

Run the seed script to create the membership types in your database:

```bash
cd esports-club
npx tsx src/libs/db/seed/membershipTypes.seed.ts
```

This creates:

-   "1 Semester Plan" membership type
-   "2 Semester Plan" membership type

## Step 5: Test the Payment Flow

1. Start your development server: `pnpm dev`
2. Navigate to `/pricing`
3. Click on a membership plan
4. Complete the Stripe checkout
5. Check that the membership is created in your database

## How It Works

### Payment Flow

1. User visits `/pricing` page
2. Page dynamically fetches prices and products from Stripe
3. User selects a membership plan
4. Form submits to `/api/stripe/checkout` with the price ID
5. Backend creates a Stripe checkout session
6. User is redirected to Stripe to complete payment
7. Stripe sends webhook to `/api/stripe/webhook`
8. Webhook creates invoice and membership records

### Database Records

When a payment is successful, the system creates:

1. An `invoice` record with payment details
2. A `membership` record linking the user to the membership type

### Files Created/Modified

-   `src/libs/stripe/server.ts` - Server-side Stripe configuration
-   `src/app/api/stripe/checkout/route.ts` - Checkout API endpoint
-   `src/app/api/stripe/webhook/route.ts` - Webhook handler
-   `src/app/(frontend)/pricing/page.tsx` - Pricing page (dynamically fetches prices)
-   `src/libs/env/index.ts` - Environment configuration
-   `scripts/setup-stripe.js` - Stripe setup script
-   `src/libs/db/seed/membershipTypes.seed.ts` - Database seed script

## Customization

### Pricing

To change the prices, modify:

1. The prices in `scripts/setup-stripe.ts`
2. The prices in `src/libs/db/seed/membershipTypes.seed.ts`
3. The pricing page will automatically display the new prices from Stripe

### Features

To modify the features list, edit the `features` array in `src/app/(frontend)/pricing/page.tsx`.

### Semester Dates

To adjust semester dates, modify the date calculations in `src/libs/db/seed/membershipTypes.seed.ts`.

### Testing

For testing, use Stripe's test mode and test card numbers:

-   Test card: `4242 4242 4242 4242`
-   Expiry: Any future date
-   CVC: Any 3 digits

## Production Deployment

1. Switch to Stripe live mode
2. Update environment variables with live keys
3. Set up production webhook endpoint
4. Test the complete payment flow
5. Monitor webhook events in Stripe dashboard

## Security Notes

-   Never expose your `STRIPE_SECRET_KEY` in client-side code
-   Always verify webhook signatures
-   Use HTTPS in production
-   Regularly rotate your API keys
