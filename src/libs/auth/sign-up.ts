import { authClient } from "./auth-client";

export const response = await authClient.signUp.email(
    {
        email: "tulza0410@gmail.com",
        password: "abcdefgh12345",
        name: "Tulza",
        callbackURL: "/",
    },
    {
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    },
);
