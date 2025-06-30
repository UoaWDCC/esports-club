import { redirect } from "next/navigation";
import { getSession } from "@libs/auth/auth";
import { isBypassingRouteProtection } from "@libs/bypass";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_UNAUTHORIZED_REDIRECT } from "@libs/routes";

import { StaffDashboardLayout } from "@/components/layout/StaffDashboardLayout";

export default async function StaffLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (isBypassingRouteProtection()) {
        return children;
    }

    // get session without cache
    const session = await getSession(null, true);

    if (!session) {
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    if (session?.user.role !== "staff") {
        redirect(DEFAULT_UNAUTHORIZED_REDIRECT);
    }

    return <StaffDashboardLayout>{children}</StaffDashboardLayout>;
}
