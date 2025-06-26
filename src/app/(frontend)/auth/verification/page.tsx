import { Suspense } from "react";
import { cookies } from "next/headers";
import { getSession } from "@libs/auth/auth";

import FormLayout from "@/components/layout/FormLayout";

import VerificationDisplay from "./components/VerificationDisplay";

export default async function Verification() {
    const cookieStore = await cookies();
    const email = cookieStore.get("verification-email")?.value || null;
    const session = await getSession();

    if (session) {
        return (
            <FormLayout>
                <h3 className="text-3xl font-medium">You are already logged in</h3>
            </FormLayout>
        );
    }

    if (email) {
        return (
            <FormLayout>
                <Suspense fallback={<div>Loading...</div>}>
                    <VerificationDisplay email={email} />
                </Suspense>
            </FormLayout>
        );
    }

    return (
        <FormLayout>
            <h3 className="text-3xl font-medium">Email not found</h3>
        </FormLayout>
    );
}
