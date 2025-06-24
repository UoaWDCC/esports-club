import { Suspense } from "react";
import { cookies } from "next/headers";
import { getSession } from "@libs/auth/auth";
import AuthLayout from "@ui/layout/AuthLayout";

import VerificationDisplay from "./components/VerificationDisplay";

export default async function Verification() {
    const cookieStore = await cookies();
    const email = cookieStore.get("verification-email")?.value || null;
    const session = await getSession();

    if (session) {
        return (
            <AuthLayout>
                <h3 className="text-3xl font-medium">You are already logged in</h3>
            </AuthLayout>
        );
    }

    if (email) {
        return (
            <AuthLayout>
                <Suspense fallback={<div>Loading...</div>}>
                    <VerificationDisplay email={email} />
                </Suspense>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <h3 className="text-3xl font-medium">Email not found</h3>
        </AuthLayout>
    );
}
