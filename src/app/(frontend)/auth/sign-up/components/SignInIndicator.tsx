import Link from "next/link";

export const SignInIndicator = () => {
    return (
        <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-blue-600">
                Sign in!
            </Link>
        </p>
    );
};
