"use client";

import { useState } from "react";
import { authClient } from "@libs/auth/auth-client";
import { DEFAULT_VERIFICATION_REDIRECT } from "@libs/routes";
import { QueryState } from "@libs/types/queryState";
import { Loader2 } from "lucide-react";

import Button from "@/components/button/Button";

const ResendVerificationButton = ({ email }: { email: string }) => {
    const [state, setState] = useState<QueryState>("idle");
    const [success, setSuccess] = useState(false);
    const sendVerificationEmail = async () => {
        await authClient.sendVerificationEmail(
            {
                email,
                callbackURL: DEFAULT_VERIFICATION_REDIRECT,
            },
            {
                onRequest: () => {
                    setState("loading");
                    setSuccess(false);
                },
                onSuccess: () => {
                    setState("idle");
                    setSuccess(true);
                },
                onError: () => setState("error"),
            },
        );
    };

    return (
        <>
            <Button className="mt-6" onClick={sendVerificationEmail} disabled={success}>
                <p>Resend verification link</p>
                {state === "loading" && <Loader2 className="animate-spin" size={16} />}
            </Button>
            {success && (
                <p className="mt-2 text-sm text-green-500">
                    A new verification link has been sent.
                </p>
            )}
            {state === "error" && (
                <p className="mt-2 text-sm text-red-500">
                    An error has occurred. Please try again.
                </p>
            )}
        </>
    );
};

export default ResendVerificationButton;
