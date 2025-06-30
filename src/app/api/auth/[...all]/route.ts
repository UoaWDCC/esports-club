import { auth } from "@libs/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

// better auth, auth handler
// https://www.better-auth.com/docs/introduction
export const { POST, GET } = toNextJsHandler(auth);
