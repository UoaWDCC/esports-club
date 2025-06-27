"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@libs/auth/auth-client";

import { Button } from "@/components/button/Button";

export function SignOut() {
    const router = useRouter();
    return (
        <form
            action={async () => {
                await authClient.signOut();
                router.refresh();
            }}
        >
            <Button variant={{ style: "solid" }} type="submit">
                SignOut
            </Button>
        </form>
    );
}
