import NextAuth from "next-auth";

import {
    DEFAULT_REDIRECT,
    DEFAULT_UNAUTHORIZED_REDIRECT,
    PUBLIC_ROUTES,
    ROOT,
} from "@/libs/routes";

import { authOptions } from "./auth";

const { auth } = NextAuth(authOptions);

export default auth((req) => {
    const { nextUrl } = req;

    console.log(nextUrl);

    const isAuthenticated = !!req.auth;
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

    console.log({ isAuthenticated, isPublicRoute });

    if (isPublicRoute && isAuthenticated) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    if (!isAuthenticated && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, nextUrl));
    }
    if (nextUrl.pathname.startsWith("/staff")) {
        return Response.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, nextUrl));
    }
});

export const config = {
    matcher: ["/staff/:path*", "/profile/:path*"],
};
