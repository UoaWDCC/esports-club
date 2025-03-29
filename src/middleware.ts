import NextAuth from "next-auth";

import { DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from "@/libs/routes";

import { authOptions } from "./auth";

const { auth } = NextAuth(authOptions);

export default auth((req) => {
    const { nextUrl } = req;

    const isAuthenticated = !!req.auth;
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

    // if user is not logged requesting a protected route
    // redirect to the login screen
    if (!isAuthenticated && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
});

export const config = {
    matcher: ["/staff/:path*", "/profile/:path*"],
};
