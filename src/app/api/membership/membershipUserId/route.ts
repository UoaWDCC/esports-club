import { NextResponse } from "next/server";

import { getAllMembershipsByUserId } from "@/services/membership/getAllMembershipsByUserId";

type Params = {
    params: { userId: string };
};

export async function GET(req: Request, { params }: Params) {
    const memberships = await getAllMembershipsByUserId(params.userId);
    return NextResponse.json({ memberships });
}
