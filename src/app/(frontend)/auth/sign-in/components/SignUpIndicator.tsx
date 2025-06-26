import { HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@libs/utils";

export const SignUpIndicator = (props: HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p {...props} className={cn("text-center text-sm", props.className)}>
            Don&#39;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-blue-600 underline">
                Sign up!
            </Link>
        </p>
    );
};
