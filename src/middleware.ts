import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
    const session = req.auth;
    const pathname = req.nextUrl.pathname;

    const isAuthenticated = !!session;

    // proteched routes
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // staff route
    if (pathname.startsWith("/staff") && session?.user.role !== "staff") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/staff/:path*", "/profile"],
};
