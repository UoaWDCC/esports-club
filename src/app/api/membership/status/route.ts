import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@libs/auth/auth";

import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession(request);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const membershipStatus = await getMembershipStatus(session.user.id);

        return NextResponse.json(membershipStatus);
    } catch (error) {
        console.error("Error checking membership status:", error);
        return NextResponse.json({ error: "Failed to check membership status" }, { status: 500 });
    }
}
