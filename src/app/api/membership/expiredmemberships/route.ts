import { NextResponse } from "next/server";

import { getAllExpiredMemberships } from "@/services/membership/getAllExpiredMemberships";

export async function GET() {
    const expiredMemberships = await getAllExpiredMemberships();
    return NextResponse.json({ expiredMemberships });
}
