import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOGIN_REDIRECT } from "@libs/routes";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    // optimistically redirect users that are not signed in
    // auth handling should be check per page/route
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/staff/:path*", "/profile/:path*"],
};
