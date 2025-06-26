"use client";

import React from "react";
import { signIn } from "@libs/auth/auth-client";

import Google from "../assets/svg/google";
import Button from "./Button";

export const signInGoogle = async () => {
    const data = await signIn.social({
        provider: "google",
    });
    return data;
};

const GoogleAuthButton = () => {
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

export default GoogleAuthButton;
