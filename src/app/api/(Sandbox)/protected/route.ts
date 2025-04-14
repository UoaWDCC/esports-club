import { NextResponse } from "next/server";
import { userRouteWrapper } from "@libs/api/wrappers";

export const GET = userRouteWrapper(async () => {
    return NextResponse.json({ message: "Hello from Next.js! This is a protected route" });
});
