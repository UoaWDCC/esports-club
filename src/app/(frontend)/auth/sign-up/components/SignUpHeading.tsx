import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const SignUpHeading = () => {
    return (
        <div>
            <Link href="/" className="flex items-center gap-2 text-blue-600">
                <ArrowLeft size={16} />
                <span className="underline">Back to home</span>
            </Link>
            <h1 className="mt-3 text-3xl font-bold">Sign up to AUEC</h1>
            <p className="mt-3 text-neutral-300">
                Set-up your profile ready for event participation!
            </p>
        </div>
    );
};
