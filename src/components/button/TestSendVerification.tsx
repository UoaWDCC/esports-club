import React from "react";
import { authClient } from "@libs/auth/auth-client";

import Button from "./Button";

export const triggerVerificationEmail = async () => {
    await authClient.sendVerificationEmail({
        email: "tulza0410@gmail.com",
        callbackURL: "/",
    });
};

const TriggerVerificationButton = () => {
    return (
        <form
            action={async () => {
                "use server";
                await triggerVerificationEmail();
            }}
        >
            <Button type="submit" variant={{ style: "google" }}>
                <span>Test verification button</span>
            </Button>
        </form>
    );
};

export default TriggerVerificationButton;
