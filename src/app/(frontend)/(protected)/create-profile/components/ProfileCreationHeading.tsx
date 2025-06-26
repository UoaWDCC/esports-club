import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@libs/routes";
import { ArrowLeft } from "lucide-react";

export const ProfileCreationHeading = () => {
    return (
        <div>
            <Link href={DEFAULT_LOGIN_REDIRECT} className="flex items-center gap-2 text-blue-600">
                <ArrowLeft size={16} />
                <span>Back to sign-in</span>
            </Link>
            <h1 className="mt-3 text-3xl font-bold">Create your profile!</h1>
            <p className="mt-3 text-neutral-300">
                To become a member of the AUEC and join tournament we need to know more about you!
            </p>
        </div>
    );
};
