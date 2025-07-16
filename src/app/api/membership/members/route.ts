// app/api/members/route.ts
import { NextResponse } from "next/server";

import { getAllMembers } from "@/services/membership/getAllMembers"; // or wherever your function is

export async function GET() {
    const members = await getAllMembers();
    return NextResponse.json({ members });
}
