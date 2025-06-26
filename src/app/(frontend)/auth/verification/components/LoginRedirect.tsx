"use client";

import { setTimeout } from "timers";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@libs/routes";

const LoginRedirect = () => {
    const router = useRouter();

    setTimeout(() => {
        router.push(DEFAULT_LOGIN_REDIRECT);
    }, 1000);

    return null;
};

export default LoginRedirect;
