import { DEFAULT_LOGIN_REDIRECT } from "@libs/routes";

import { Button } from "@/components/button/Button";

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6">
                <h3 className="text-2xl">404 - Unauthorized</h3>
                <div className="flex gap-3">
                    <Button href="/" variant={{ style: "cta" }}>
                        Return Home
                    </Button>
                    <Button href={DEFAULT_LOGIN_REDIRECT} variant={{ style: "solid" }}>
                        Sign-in
                    </Button>
                </div>
            </div>
        </div>
    );
}
