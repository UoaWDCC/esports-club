import Link from "next/link";

export const SignUpIndicator = () => {
    return (
        <p className="text-center text-sm">
            Don&#39;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-blue-600">
                Sign up!
            </Link>
        </p>
    );
};
