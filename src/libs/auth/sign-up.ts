import { authClient } from "./auth-client";

const { data, error } = await authClient.signUp.email(
    {
        email: "tulza0410@gmail.com",
        password: "abcdefgh12345",
        name: "Tulza",
        callbackURL: "/",
    },
    {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    },
);
