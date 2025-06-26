// components/forms/SignupForm.tsx
"use client";

import { useRef } from "react";
import { authClient } from "@libs/auth/auth-client";
import { DEFAULT_PROFILE_REDIRECT } from "@libs/routes";

import { Button } from "@/components/button/Button";
import { GoogleAuthButton } from "@/components/button/GoogleAuthButton";
import { InputField } from "@/components/form/InputField";
import { Divide } from "@/components/spacer/Divide";
import { TosAndPolicy } from "@/components/text/TosAndPolicy";

import { SignInHeading } from "./SignInHeading";
import { SignUpIndicator } from "./SignUpIndicator";

// AI generated, replace with actual UI soon
// TODO replace with form component

export function SignInForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        authClient.signIn.email({ email, password, callbackURL: DEFAULT_PROFILE_REDIRECT });
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <SignInHeading />
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField label="Email" type="email" ref={emailRef} required />
                <InputField label="Password" type="password" ref={passwordRef} required />
                <SignUpIndicator />
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>
            <Divide text="or" />
            <GoogleAuthButton />
            <TosAndPolicy />
        </div>
    );
}
