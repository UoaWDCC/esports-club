import NextAuth from "next-auth";

import { DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES, ROOT } from "@/libs/routes";

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

    // if user is logged requesting a staff route
    // redirect to the root page if the user is not staff
    if (nextUrl.pathname.startsWith("/staff") && req.auth?.user.role !== "staff") {
        return Response.redirect(new URL(ROOT, nextUrl));
    }
});

export const config = {
    matcher: ["/staff/:path*", "/profile/:path*"],
};
