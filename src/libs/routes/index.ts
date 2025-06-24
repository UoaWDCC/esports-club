import {
    AUTH_ROUTES,
    PROTECTED_ROUTES,
    PUBLIC_ROUTES,
    STAFF_ROUTES,
    TEST_ROUTES,
} from "./index.generated";

export const ROOT = "/";
export const DEFAULT_LOGIN_REDIRECT = "/auth/sign-in/";
export const DEFAULT_VERIFICATION_REDIRECT = "/auth/veriftication/";
export const DEFAULT_UNAUTHORIZED_REDIRECT = "/unauthorized";

export const ROUTE_SYSTEM = [
    PUBLIC_ROUTES,
    AUTH_ROUTES,
    PROTECTED_ROUTES,
    STAFF_ROUTES,
    TEST_ROUTES,
];
