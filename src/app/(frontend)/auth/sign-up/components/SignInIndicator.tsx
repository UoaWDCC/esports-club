import { HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@libs/utils/class";

export const SignInIndicator = (props: HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p {...props} className={cn("text-center text-sm", props.className)}>
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-blue-600 underline">
                Sign in!
            </Link>
        </p>
    );
};
