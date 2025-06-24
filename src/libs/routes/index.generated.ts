
// automatically generated with generate-index.js, 
// last generated: 24/06/2025

export type RouteSection = {
    name: string;
    routes: Route[];
};

export type Route = { url: string; name: string };

export const PUBLIC_ROUTES: RouteSection = {
  "name": "Public Routes",
  "routes": [
    {
      "url": "/memberCSVUpload/",
      "name": "CSVUploadPage"
    },
    {
      "url": "/",
      "name": "HomePage"
    }
  ]
};

export const AUTH_ROUTES: RouteSection = {
  "name": "Auth Routes",
  "routes": [
    {
      "url": "/auth/sign-in/",
      "name": "SignInPage"
    },
    {
      "url": "/auth/sign-up/",
      "name": "SignUpPage"
    }
  ]
};

export const PROTECTED_ROUTES: RouteSection = {
  "name": "Protected Routes",
  "routes": [
    {
      "url": "/profile/",
      "name": "ProfilePage"
    }
  ]
};

export const STAFF_ROUTES: RouteSection = {
  "name": "Staff Routes",
  "routes": [
    {
      "url": "/staff/",
      "name": "StaffPage"
    }
  ]
};

export const TEST_ROUTES: RouteSection = {
  "name": "Test Routes",
  "routes": [
    {
      "url": "/auth/test/",
      "name": "TestAuthDataPage"
    },
    {
      "url": "/test/email/verification/",
      "name": "EmailVerificationPage"
    },
    {
      "url": "/test/",
      "name": "TestNavigation"
    }
  ]
};
