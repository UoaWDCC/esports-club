// components/forms/SignupForm.tsx
"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@libs/auth/auth-client";
import { DEFAULT_VERIFICATION_REDIRECT } from "@libs/routes";

import { Button } from "@/components/button/Button";
import { GoogleAuthButton } from "@/components/button/GoogleAuthButton";
import { InputField } from "@/components/form/InputField";
import { Divide } from "@/components/spacer/Divide";
import { TosAndPolicy } from "@/components/text/TosAndPolicy";

import { SignInIndicator } from "./SignInIndicator";
import { SignUpHeading } from "./SignUpHeading";

// AI generated, replace with actual UI soon
// TODO replace with form component

export function SignUpForm() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match, TBA error state UI");
            return;
        }

        authClient.signUp.email(
            {
                email,
                password,
                name: "",
                callbackURL: DEFAULT_VERIFICATION_REDIRECT,
            },
            {
                onSuccess: () => {
                    document.cookie = `verification-email=${encodeURIComponent(email)}; max-age=900; path=/; secure; samesite=lax`;
                    router.push(DEFAULT_VERIFICATION_REDIRECT);
                },
            },
        );
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <SignUpHeading />
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField label="Email" type="email" ref={emailRef} required />
                <InputField label="Password" type="password" ref={passwordRef} required />
                <InputField
                    label="Confirm Password"
                    type="password"
                    ref={confirmPasswordRef}
                    required
                />
                <SignInIndicator />
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </form>
            <Divide text="or" />
            <GoogleAuthButton />
            <TosAndPolicy />
        </div>
    );
}
