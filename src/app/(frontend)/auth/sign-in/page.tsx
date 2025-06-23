import AuthLayout from "@ui/layout/AuthLayout";

import SignInForm from "./components/SignInForm";

export default async function SignInPage() {
    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    );
}
