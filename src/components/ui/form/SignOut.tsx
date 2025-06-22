"use client";

import { authClient } from "@libs/auth/auth-client";
import Button from "@ui/button/Button";

export default function SignOut() {
    return (
        <form
            action={async () => {
                await authClient.signOut();
            }}
        >
            <Button variant={{ style: "solid" }} type="submit">
                SignOut
            </Button>
        </form>
    );
}
