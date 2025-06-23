import AuthLayout from "@ui/layout/AuthLayout";

import SignUpForm from "./components/SignUpForm";

export default async function SignInPage() {
    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    );
}
