import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";

// client side auth
// use with 'use client'
export const authClient = createAuthClient({
    plugins: [organizationClient()],
});

export const { signIn, signOut, useSession } = authClient;
