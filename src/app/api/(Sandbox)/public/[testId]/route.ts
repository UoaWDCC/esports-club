import { NextResponse } from "next/server";
import { RouteContext, routeWrapper } from "@libs/api/wrappers";

export const GET = routeWrapper(async (req, session, context: RouteContext<"testId">) => {
    const { testId } = await context.params;

    return NextResponse.json({
        message: "Hello from Next.js! This is a public route",
        session,
        testId,
        req,
    });
});
