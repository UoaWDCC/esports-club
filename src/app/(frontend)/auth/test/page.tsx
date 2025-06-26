import { getSession } from "@libs/auth/auth";

import SignOut from "@/components/button/SignOut";

import SignInForm from "../sign-in/components/SignInForm";
import SignUpForm from "../sign-up/components/SignUpForm";

export default async function TestAuthDataPage() {
    const session = await getSession();

    return (
        <div className="grid min-h-screen grid-cols-2 place-items-center">
            <SignUpForm />
            <SignInForm />
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <SignOut />
        </div>
    );
}
