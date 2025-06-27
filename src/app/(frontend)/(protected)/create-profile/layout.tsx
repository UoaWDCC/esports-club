import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@libs/auth/auth";
import { isBypassingRouteProtection } from "@libs/bypass";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_PROFILE_REDIRECT } from "@libs/routes";

import { validateUserProfile } from "@/services/profile/validateUserProfile";

// requires user to be logged in
// requires user to NOT have a profile
export default async function CreateProfileLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    if (isBypassingRouteProtection()) {
        return children;
    }

    // get session
    const session = await getSession();
    if (!session) {
        console.log("no session");
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    // validate and pass profile
    const profile = await validateUserProfile(session.user.id);

    if (profile.success) {
        console.log("valid profile");
        redirect(DEFAULT_PROFILE_REDIRECT);
    }

    return children;
}
