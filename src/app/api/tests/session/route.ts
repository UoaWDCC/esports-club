import { NextRequest, NextResponse } from "next/server";
import { routeWrapper } from "@libs/api/wrappers";

export const GET = routeWrapper(async (req: NextRequest, session, context) => {
    const cookie = req.cookies.getAll();
    const path = req.nextUrl.pathname;
    const search = req.nextUrl.search;
    const searchParams = req.nextUrl.searchParams;
    const allSearchParams = Object.fromEntries(searchParams.entries());

    const res = NextResponse.json({
        message: "Hello from Next.js! This is a public route",
        session,
        cookie,
        path,
        search,
        searchParam: allSearchParams,
        context,
    });

    res.cookies.set("AAAAAAAA", "AAAAAAAAAAAAAAAAA", {
        httpOnly: true, // optional
        path: "/",
    });

    return res;
});
