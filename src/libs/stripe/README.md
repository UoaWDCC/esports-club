# Stripe Library Structure

This directory contains modular Stripe utilities organized by functionality with direct imports (no barrel files).

## Structure

```
stripe/
├── client.ts                          # Shared Stripe client instance
├── server.ts                          # Main server exports (for backward compatibility)
├── index.ts                           # Client-side Stripe utilities
├── checkout/
│   └── createCheckoutSession.ts       # Create checkout sessions
├── customers/
│   └── createCustomerPortalSession.ts # Customer portal sessions
├── products/
│   ├── createStripeProduct.ts         # Create products
│   ├── updateStripeProduct.ts         # Update products
│   ├── deactivateStripeProduct.ts     # Deactivate products
│   └── getStripeProducts.ts           # Get products
└── prices/
    ├── createStripePrice.ts           # Create prices
    ├── updateStripePrice.ts           # Update prices
    ├── deactivateStripePrice.ts       # Deactivate prices
    └── getStripePrices.ts             # Get prices
```

## Usage

### Import directly from specific files (recommended)
```typescript
import { createStripeProduct } from "@libs/stripe/products/createStripeProduct";
import { createCheckoutSession } from "@libs/stripe/checkout/createCheckoutSession";
import { createStripePrice } from "@libs/stripe/prices/createStripePrice";
import { stripe } from "@libs/stripe/client";
```

### Import from server.ts (for backward compatibility)
```typescript
import { createStripeProduct, createCheckoutSession } from "@libs/stripe/server";
```

## Benefits of Direct Imports

- **Better Tree Shaking**: Only import the functions you actually use
- **Explicit Dependencies**: Clear which functions are being used
- **Faster Build Times**: No need to process barrel files
- **Better IDE Support**: More precise auto-imports and intellisense
- **Easier Debugging**: Clear import paths in stack traces

## Modules

### Checkout
- `createCheckoutSession`: Create Stripe checkout sessions for payments

### Customers
- `createCustomerPortalSession`: Create customer portal sessions for subscription management

### Products
- `createStripeProduct`: Create new Stripe products
- `updateStripeProduct`: Update existing products
- `deactivateStripeProduct`: Deactivate products
- `getStripeProducts`: Retrieve all active products

### Prices
- `createStripePrice`: Create new prices for products
- `updateStripePrice`: Update prices (creates new, deactivates old)
- `deactivateStripePrice`: Deactivate prices
- `getStripePrices`: Retrieve all active prices with product info

## Client
- `stripe`: Shared Stripe client instance for server-side operations
- Configured with API version and secret key from environment variables

## Migration Guide

For new code, prefer direct imports:

**Before:**
```typescript
import { createStripeProduct, updateStripeProduct } from "@libs/stripe/server";
```

**After:**
```typescript
import { createStripeProduct } from "@libs/stripe/products/createStripeProduct";
import { updateStripeProduct } from "@libs/stripe/products/updateStripeProduct";
```

All existing imports from `@libs/stripe/server` will continue to work without changes for backward compatibility.

