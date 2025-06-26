import { FormLayout } from "@/components/layout/FormLayout";

import { SignUpForm } from "./components/SignUpForm";

export default async function SignUpPage() {
    return (
        <FormLayout>
            <SignUpForm />
        </FormLayout>
    );
}
