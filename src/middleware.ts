import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@libs/auth/auth";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const pathname = request.nextUrl.pathname;
    const isAuthenticated = !!session;

    // staff route
    if (pathname.startsWith("/staff") && session?.user.role !== "staff") {
        console.log("entering staff route");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!session) {
        console.log("not authenticated");
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    console.log("passing");
    return NextResponse.next();
}

export const config = {
    matcher: ["/staff/:path*", "/profile"],
};
