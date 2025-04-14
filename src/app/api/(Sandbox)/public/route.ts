import { NextResponse } from "next/server";
import { routeWrapper } from "@libs/api/wrappers";

export const GET = routeWrapper(async (req, res, session) => {
    return NextResponse.json({ message: "Hello from Next.js! This is a public route", session });
});
