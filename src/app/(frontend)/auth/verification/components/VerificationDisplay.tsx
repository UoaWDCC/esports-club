import React, { ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { isEmailVerified } from "@/services/email/is-email-verified";

import LoginRedirect from "./LoginRedirect";
import ResendVerificationButton from "./ResendVerificationButton";

const VerificationDisplay = async ({ email }: { email: string }) => {
    const emailVerified = await isEmailVerified(email);

    if (!emailVerified) {
        return (
            <VerificaitonContainer>
                <h1 className="text-3xl">Verify your email</h1>
                <p className="mt-3">
                    We have sent an email to <span className="font-medium">{email}</span>.
                </p>
                <p>Continue account creation by using the link via email.</p>
                <ResendVerificationButton email={email} />
            </VerificaitonContainer>
        );
    }

    if (emailVerified) {
        return (
            <VerificaitonContainer>
                <h1 className="text-3xl">Email is verified!</h1>
                <div className="mt-6 flex w-min items-center justify-center gap-2">
                    <p>Redirecting to sign-in...</p>
                    <Loader2 size={16} className="animate-spin" />
                </div>
                <LoginRedirect />
            </VerificaitonContainer>
        );
    }
};

const VerificaitonContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex w-[350px] flex-col items-center text-center whitespace-nowrap">
            {children}
        </div>
    );
};

export default VerificationDisplay;
