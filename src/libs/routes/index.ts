import { JSX } from "react";

import {
    AUTH_ROUTES,
    PROTECTED_ROUTES,
    PUBLIC_ROUTES,
    STAFF_ROUTES,
    TEST_ROUTES,
} from "./index.generated";

export const ROOT = "/";
export const DEFAULT_LOGIN_REDIRECT = "/auth/sign-in/";
export const DEFAULT_INTERNAL_ERROR_REDIRECT = "/error/";
export const DEFAULT_PROFILE_REDIRECT = "/profile/";
export const DEFAULT_PROFILE_CREATION_REDIRECT = "/create-profile/";
export const DEFAULT_VERIFICATION_REDIRECT = "/auth/verification/";
export const DEFAULT_UNAUTHORIZED_REDIRECT = "/unauthorized";

export const ROUTE_SYSTEM = [
    PUBLIC_ROUTES,
    AUTH_ROUTES,
    PROTECTED_ROUTES,
    STAFF_ROUTES,
    TEST_ROUTES,
];

export type NavigationGrouping = {
    label?: string;
    links: {
        name: string;
        href: string;
        icon?: JSX.Element;
        notImplemented?: boolean;
    }[];
    config?: {
        staffOnly?: boolean;
        AdminOnly?: boolean;
    };
};
