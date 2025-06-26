import { NextResponse } from "next/server";
import { RouteContext, routeWrapper } from "@libs/api/wrappers";

export const GET = routeWrapper(async (req, session, context: RouteContext<"dynamic">) => {
    const { dynamic } = await context?.params;

    return NextResponse.json({
        message: "Hello from Next.js! This is a public route",
        session,
        dynamic,
        req,
    });
});
