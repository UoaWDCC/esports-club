import { NextResponse } from "next/server";
import { RouteContext, routeWrapper } from "@libs/api/wrappers";

export const GET = routeWrapper(async (req, session, context: RouteContext<"id">) => {
    const { id } = await context.params;

    return NextResponse.json({
        message: "Hello from Next.js! This is a public route",
        session,
        req,
    });
});
