export type RouteSection = {
    name: string;
    routes: Route[];
};

export type Route = { url: string; name: string };

const protectedRoutes: RouteSection = {
    name: "Protected Routes",
    routes: [{ url: "/profile", name: "Profile" }],
};

const staffRoutes: RouteSection = {
    name: "Staff Routes",
    routes: [
        { url: "/staff", name: "Staff" },
        { url: "/memberCSVUpload", name: "Member CSV Upload" },
    ],
};

const authRoutes: RouteSection = {
    name: "Auth Routes",
    routes: [
        { url: "/auth/sign-in", name: "Sign In" },
        { url: "/auth/sign-up", name: "Sign Up" },
        { url: "/auth/tests", name: "Auth Tests" },
    ],
};

const testRoutes: RouteSection = {
    name: "Test Routes",
    routes: [
        { url: "/test", name: "Test Home" },
        { url: "/test/email/verification", name: "Email Verification" },
    ],
};

const publicRoutes: RouteSection = {
    name: "Public Routes",
    routes: [{ url: "/", name: "Home" }],
};

export const routeSystem = [publicRoutes, authRoutes, protectedRoutes, staffRoutes, testRoutes];
