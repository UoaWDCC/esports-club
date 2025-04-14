import { NextResponse } from "next/server";
import { staffRouteWrapper } from "@libs/api/wrappers";

export const GET = staffRouteWrapper(async () => {
    return NextResponse.json({ message: "Hello from Next.js! This is a staff route" });
});
