import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@libs/auth/auth";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_PROFILE_CREATION_REDIRECT } from "@libs/routes";

import { validateUserProfile } from "@/services/profile/validateUserProfile";

import { ProfileProvider } from "./components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
export default async function ProfileLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    // get session
    const session = await getSession();
    if (!session) {
        console.log("no session");
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    // validate and pass profile
    const profile = await validateUserProfile(session.user.id);

    console.log(profile.error);
    if (!profile.success) {
        console.log("no profile");
        redirect(DEFAULT_PROFILE_CREATION_REDIRECT);
    }

    return <ProfileProvider profile={profile.data}>{children}</ProfileProvider>;
}
