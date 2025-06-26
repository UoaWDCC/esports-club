import React from "react";
import Link from "next/link";

export const TosAndPolicy = () => {
    return (
        <div className="text-neetral-300 text-center text-sm">
            <p>
                By continuing, you agree to AUEC’s{" "}
                <Link href="/policies/terms-of-service" className="underline" target="_blank">
                    Terms of Service
                </Link>
            </p>
            <p>
                Read our{" "}
                <Link href="/policies/privacy-policy" className="underline" target="_blank">
                    Privacy Policy
                </Link>
            </p>
        </div>
    );
};
