// components/forms/SignupForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@libs/auth/auth-client";
import { DEFAULT_PROFILE_REDIRECT } from "@libs/routes";
import { SignInSchema } from "@libs/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button/Button";
import { GoogleAuthButton } from "@/components/button/GoogleAuthButton";
import { InputField } from "@/components/form/InputField";
import { Divide } from "@/components/spacer/Divide";
import { TosAndPolicy } from "@/components/text/TosAndPolicy";

import { SignInHeading } from "./SignInHeading";
import { SignUpIndicator } from "./SignUpIndicator";

export function SignInForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(SignInSchema),
    });

    const onSubmit = handleSubmit((data) => {
        const { email, password } = data;
        authClient.signIn.email(
            { email, password, callbackURL: DEFAULT_PROFILE_REDIRECT },

            {
                onError() {
                    setError("email", { message: " " });
                    setError("password", { message: "Invlid email or password" });
                },
            },
        );
    });

    return (
        <div className="w-full max-w-md space-y-3">
            <SignInHeading />
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
                <SignUpIndicator className="mt-3" />
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
