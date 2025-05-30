import { auth } from "@/auth";
import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }
    const status = await getMembershipStatus(session.user.id);
    return Response.json({ status });
}