import { FormLayout } from "@/components/layout/FormLayout";

import { SignInForm } from "./components/SignInForm";

export default async function SignInPage() {
    return (
        <FormLayout>
            <SignInForm />
        </FormLayout>
    );
}
