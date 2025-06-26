// components/forms/SignupForm.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { authClient } from "@libs/auth/auth-client";
import { ArrowLeft } from "lucide-react";

import Button from "@/components/button/Button";
import GoogleAuthButton from "@/components/button/GoogleAuthButton";
import { InputField } from "@/components/form/InputField";
import { TosAndPolicy } from "@/components/text/TosAndPolicy";

// AI generated, replace with actual UI soon
// TODO replace with form component

export default function SignInForm() {
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

        authClient.signIn.email({ email, password, callbackURL: "/" });
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div>
                <Link href="/" className="flex items-center gap-2 text-blue-600">
                    <ArrowLeft size={16} />
                    <span>Back to home</span>
                </Link>
                <h1 className="mt-3 text-3xl font-bold">Sign in to AUEC</h1>
                <p className="mt-3 text-neutral-300">
                    Welcome back! Please sign in to access your account.
                </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField label="Email" type="email" ref={emailRef} required />
                <InputField label="Password" type="password" ref={passwordRef} required />

                <p className="text-center text-sm">
                    Don&#39;t have an account?{" "}
                    <Link href="/auth/sign-up" className="text-blue-600">
                        Sign up!
                    </Link>
                </p>
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

export const Divide = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-neutral-400" />
            <span className="text-sm text-neutral-400">{text}</span>
            <div className="h-px flex-1 bg-neutral-400" />
        </div>
    );
};
