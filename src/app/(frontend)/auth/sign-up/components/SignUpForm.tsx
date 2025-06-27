// components/forms/SignUpForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@libs/auth/auth-client";
import { DEFAULT_VERIFICATION_REDIRECT } from "@libs/routes";
import { SignUpSchema } from "@libs/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button/Button";
import { GoogleAuthButton } from "@/components/button/GoogleAuthButton";
import { InputField } from "@/components/form/InputField";
import { Divide } from "@/components/spacer/Divide";
import { TosAndPolicy } from "@/components/text/TosAndPolicy";

import { SignInIndicator } from "./SignInIndicator";
import { SignUpHeading } from "./SignUpHeading";

export function SignUpForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(SignUpSchema),
    });

    const onSubmit = handleSubmit((data) => {
        const { email, password } = data;
        authClient.signOut();
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
    });

    return (
        <div className="w-full max-w-md space-y-3">
            <SignUpHeading />
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                <InputField
                    label="Email"
                    type="text"
                    {...register("email")}
                    error={errors.email?.message}
                />
                <InputField
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                />
                <InputField
                    label="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
                <SignInIndicator className="mt-3" />
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
