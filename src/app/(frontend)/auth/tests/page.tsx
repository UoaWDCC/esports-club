import { getSession } from "@libs/auth/auth";
import SignOut from "@ui/form/SignOut";

import SignInForm from "../sign-in/components/SignInForm";
import SignUpForm from "../sign-up/components/SignUpForm";

export default async function SignInPage() {
    const session = await getSession();
    console.log("session", session);

    return (
        <div className="grid min-h-screen grid-cols-2 place-items-center">
            <SignUpForm />
            <SignInForm />
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <SignOut />
        </div>
    );
}
