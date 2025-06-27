import { redirect } from "next/navigation";
import { getSession } from "@libs/auth/auth";
import { isBypassingRouteProtection } from "@libs/bypass";
import { DEFAULT_LOGIN_REDIRECT } from "@libs/routes";

export default async function StaffLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (isBypassingRouteProtection()) {
        return children;
    }

    const session = await getSession();

    if (!session) {
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    // TODO change to unauthorized
    if (session?.user.role !== "staff") {
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    return children;
}
