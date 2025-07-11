/**
 * Membership Status API Route
 *
 * This API endpoint provides membership status information for authenticated users.
 * It checks if a user has an active, paid membership and returns detailed information
 * about their current membership status.
 *
 * Endpoint: GET /api/membership/status
 *
 * Features:
 * - Requires user authentication
 * - Checks for active, paid memberships
 * - Returns membership type details and validity information
 * - Used by pricing page to show current membership status
 * - Prevents duplicate membership purchases
 *
 * Response Format:
 * {
 *   isValid: boolean,
 *   membership?: {
 *     id: string,
 *     membershipTypeId: string,
 *     isPaid: boolean,
 *     createdAt: Date
 *   },
 *   membershipType?: {
 *     id: string,
 *     name: string,
 *     description?: string,
 *     startAt: Date,
 *     endAt: Date,
 *     price: number
 *   },
 *   error?: string
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@libs/auth/auth";

import { getMembershipStatus } from "@/services/membership/getMembershipStatus";

/**
 * GET /api/membership/status
 *
 * Retrieves the current membership status for an authenticated user.
 *
 * This endpoint is used by the pricing page to:
 * 1. Check if a user already has an active membership
 * 2. Display current membership details if they exist
 * 3. Prevent users from purchasing duplicate memberships
 * 4. Show membership expiration dates and plan details
 *
 * The endpoint performs authentication checks and returns detailed
 * membership information including validity status, membership type
 * details, and any relevant error messages.
 *
 * @param request - NextRequest containing user session information
 * @returns JSON response with membership status information
 * @throws 401 if user is not authenticated
 * @throws 500 if membership status check fails
 */
export async function GET(request: NextRequest) {
    try {
        // Step 1: Authenticate the user and get their session
        const session = await getSession(request);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Get the user's membership status using their user ID
        const membershipStatus = await getMembershipStatus(session.user.id);

        // Step 3: Return the membership status information
        return NextResponse.json(membershipStatus);
    } catch (error) {
        console.error("Error checking membership status:", error);
        return NextResponse.json({ error: "Failed to check membership status" }, { status: 500 });
    }
}
