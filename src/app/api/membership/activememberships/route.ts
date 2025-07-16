import { NextResponse } from "next/server";

import { getAllActiveMemberships } from "@/services/membership/getAllActiveMemberships";

export async function GET() {
    const activeMemberships = await getAllActiveMemberships();
    return NextResponse.json({ activeMemberships });
}
