import React from "react";
import Google from "@ui/svg/google";

import { signIn } from "@/auth";

import Button from "./Button";

const GoogleAuthButton = () => {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google");
            }}
        >
            <Button type="submit" variant={{ style: "google" }}>
                <Google />
                <span>Continue with Google</span>
            </Button>
        </form>
    );
};

export default GoogleAuthButton;
