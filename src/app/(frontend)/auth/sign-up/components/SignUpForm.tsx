// components/forms/SignupForm.tsx
"use client";

import { forwardRef, InputHTMLAttributes, useId, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@libs/auth/auth-client";
import { DEFAULT_VERIFICATION_REDIRECT } from "@libs/routes";
import Button from "@ui/button/Button";
import GoogleAuthButton from "@ui/button/GoogleAuthButton";
import Google from "@ui/svg/google";
import { ArrowLeft } from "lucide-react";

// AI generated, replace with actual UI soon
// TODO replace with form component

export default function SignUpForm() {
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
            <div>
                <Link href="/" className="flex items-center gap-2 text-blue-600">
                    <ArrowLeft size={16} />
                    <span>Back to home</span>
                </Link>
                <h1 className="mt-3 text-3xl font-bold">Sign up to AUEC</h1>
                <p className="mt-3 text-neutral-300">
                    Set-up your profile ready for event participation!
                </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField label="Email" type="email" ref={emailRef} required />
                <InputField label="Password" type="password" ref={passwordRef} required />
                <InputField
                    label="Confirm Password"
                    type="password"
                    ref={confirmPasswordRef}
                    required
                />
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/sign-in" className="text-blue-600">
                        Sign in!
                    </Link>
                </p>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </form>
            <Divide text="or" />
            <GoogleAuthButton />
            <div className="text-neetral-300 text-center text-sm">
                <p>
                    By continuing, you agree to AUEC’s{" "}
                    <Link href="/policies/terms-of-service">Terms of Service</Link>
                </p>
                <p>
                    Read our <Link href="/policies/privacy-policy">Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, ...props }, ref) => {
        const id = useId();

        return (
            <div>
                <label className="block text-sm font-medium" htmlFor={id}>
                    {label}
                </label>
                <input
                    {...props}
                    ref={ref}
                    id={id}
                    className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:outline-none"
                />
            </div>
        );
    },
);

InputField.displayName = "InputField";

export const Divide = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-neutral-400" />
            <span className="text-sm text-neutral-400">{text}</span>
            <div className="h-px flex-1 bg-neutral-400" />
        </div>
    );
};
