// automatically generated with generate-index.js,
// last generated: 18/08/2025

export type RouteSection = {
    name: string;
    routes: Route[];
};

export type Route = { url: string; name: string };

export const PUBLIC_ROUTES: RouteSection = {
    name: "Public Routes",
    routes: [
        {
            url: "/",
            name: "LandingPage",
        },
        {
            url: "/policies/",
            name: "page",
        },
        {
            url: "/policies/privacy-policy/",
            name: "page",
        },
        {
            url: "/policies/terms-and-services/",
            name: "page",
        },
        {
            url: "/pricing/",
            name: "PricingPage",
        },
        {
            url: "/unauthorized/",
            name: "UnauthorizedPage",
        },
    ],
};

export const AUTH_ROUTES: RouteSection = {
    name: "Auth Routes",
    routes: [
        {
            url: "/auth/sign-in/",
            name: "SignInPage",
        },
        {
            url: "/auth/sign-up/",
            name: "SignUpPage",
        },
        {
            url: "/auth/verification/",
            name: "Verification",
        },
    ],
};

export const PROTECTED_ROUTES: RouteSection = {
    name: "Protected Routes",
    routes: [
        {
            url: "/create-profile/",
            name: "ProfileCreationPage",
        },
        {
            url: "/profile/account/",
            name: "AccountPage",
        },
        {
            url: "/profile/invoice/",
            name: "InvoicePage",
        },
        {
            url: "/profile/membership/",
            name: "MembershipPage",
        },
        {
            url: "/profile/",
            name: "ProfilePage",
        },
        {
            url: "/profile/themes/",
            name: "ThemePage",
        },
    ],
};

export const STAFF_ROUTES: RouteSection = {
    name: "Staff Routes",
    routes: [
        {
            url: "/staff/memberCSVUpload/",
            name: "CSVUploadPage",
        },
        {
            url: "/staff/members/",
            name: "StaffMemberPage",
        },
        {
            url: "/staff/members-approval/",
            name: "StaffMemberPage",
        },
        {
            url: "/staff/",
            name: "StaffPage",
        },
        {
            url: "/staff/pricing/",
            name: "PricingPage",
        },
        {
            url: "/theme/",
            name: "ThemePage",
        },
    ],
};

export const TEST_ROUTES: RouteSection = {
    name: "Test Routes",
    routes: [
        {
            url: "/auth/test/",
            name: "TestAuthDataPage",
        },
        {
            url: "/test/email/verification/",
            name: "EmailVerificationPage",
        },
        {
            url: "/test/",
            name: "TestNavigation",
        },
    ],
};
