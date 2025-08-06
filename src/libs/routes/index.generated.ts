
// automatically generated with generate-index.js, 
// last generated: 29/07/2025

export type RouteSection = {
    name: string;
    routes: Route[];
};

export type Route = { url: string; name: string };

export const PUBLIC_ROUTES: RouteSection = {
  "name": "Public Routes",
  "routes": [
    {
      "url": "/",
      "name": "LandingPage"
    },
    {
      "url": "/unauthorized/",
      "name": "UnauthorizedPage"
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
    },
    {
      "url": "/auth/verification/",
      "name": "Verification"
    }
  ]
};

export const PROTECTED_ROUTES: RouteSection = {
  "name": "Protected Routes",
  "routes": [
    {
      "url": "/create-profile/",
      "name": "ProfileCreationPage"
    },
    {
      "url": "/profile/account/",
      "name": "AccountPage"
    },
    {
      "url": "/profile/invoice/",
      "name": "InvoicePage"
    },
    {
      "url": "/profile/membership/",
      "name": "MembershipPage"
    },
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
      "url": "/staff/memberCSVUpload/",
      "name": "CSVUploadPage"
    },
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
      "url": "/test/memberApproval/",
      "name": "memberApprovalPage"
    },
    {
      "url": "/test/",
      "name": "TestNavigation"
    }
  ]
};
