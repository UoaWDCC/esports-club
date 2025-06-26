"use client";

import React from "react";
import { signIn } from "@libs/auth/auth-client";
import { DEFAULT_PROFILE_REDIRECT } from "@libs/routes";

import { Google } from "../assets/svg/google";
import { Button } from "./Button";

const signInGoogle = async () => {
    const data = await signIn.social({
        provider: "google",
        callbackURL: DEFAULT_PROFILE_REDIRECT,
    });
    return data;
};

export const GoogleAuthButton = () => {
    return (
        <form
            action={async () => {
                await signInGoogle();
            }}
        >
            <Button type="submit" variant={{ style: "google" }} className="w-full">
                <Google />
                <span>Continue with Google</span>
            </Button>
        </form>
    );
};
