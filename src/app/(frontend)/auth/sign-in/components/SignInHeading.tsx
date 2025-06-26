import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const SignInHeading = () => {
    return (
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
    );
};
