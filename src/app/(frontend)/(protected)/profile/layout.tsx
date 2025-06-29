import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@libs/auth/auth";
import { isBypassingRouteProtection } from "@libs/bypass";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_PROFILE_CREATION_REDIRECT } from "@libs/routes";

import { ProfileDashboardLayout } from "@/components/layout/ProfileDashboardLayout";
import { validateUserProfile } from "@/services/profile/validateUserProfile";

import { ProfileProvider } from "./components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
export default async function ProfileLayout({
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
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    // validate and pass profile
    const profile = await validateUserProfile(session.user.id);

    // user does not have a profile
    if (!profile.success) {
        redirect(DEFAULT_PROFILE_CREATION_REDIRECT);
    }

    return (
        <ProfileDashboardLayout>
            <ProfileProvider profile={profile.data}>{children}</ProfileProvider>
        </ProfileDashboardLayout>
    );
}
