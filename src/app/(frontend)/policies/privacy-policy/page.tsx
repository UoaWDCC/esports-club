import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

export default function page() {
    return (
        <PageLayout>
            <div className="font-satoshi py-12 text-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-tomorrow py-18 text-6xl">Privacy Policy</h1>
                    <h2 className="py-6 text-[#AFAFAF]">Last updated: 26 May 2025</h2>
                </div>

                <div className="flex flex-col items-center">
                    <div className="2-full flex max-w-[800px] flex-col gap-12 border border-black">
                        <p className="leading-none">
                            This Privacy Policy explains how the Auckland University Esports Club's
                            membership and tournament platform (“Service”), developed by WDCC{" "}
                            <strong>(Web Development and Consulting Club)</strong>, collects, uses,
                            and protects your personal information.
                        </p>

                        <h2 className="text-left text-3xl">1. Information We Collect</h2>
                        <div className="flex flex-col gap-2">
                            <p>
                                When you register using Google OAuth, we collect the following data:
                            </p>
                            <ul className="list-inside list-disc">
                                <li>Your name</li>
                                <li>Your email address</li>
                                <li>Your Google profile image</li>
                            </ul>
                            <p>
                                We also use Google Analytics and other tracking tools to gather
                                anonymous usage statistics to improve our platform. We do not
                                collect IP addresses, device information, or any technical metadata.
                            </p>
                        </div>

                        <h2 className="text-3xl">2. How We Use Your Data</h2>
                        <div className="flex flex-col gap-2">
                            <p>We use your information solely to:</p>
                            <ul className="list-inside list-disc">
                                <li>
                                    Confirm your identity for membership access and tournament
                                    participation
                                </li>
                                <li>Allow you to manage your account settings</li>
                                <li>Monitor platform usage for internal improvements</li>
                            </ul>
                            <p>We do not share your personal data with any third parties.</p>
                        </div>
                        <h2 className="text-3xl">3. Data Storage</h2>
                        <p>
                            All data is stored securely on NeonDB, a third-party managed PostgreSQL
                            hosting provider. Authentication is handled using role-based session
                            cookies, and access to personal data is limited to authorized staff
                            members.
                        </p>
                        <h2 className="text-3xl">4. Cookie and Tracking</h2>
                        <p>
                            We use cookies to manage your session and authentication. Google
                            Analytics and other tools may use cookies to collect anonymized usage
                            data.
                        </p>
                        <h2 className="text-3xl">5. Your Rights</h2>
                        <p className="">
                            You may update your personal information at any time via your account
                            settings. Some fields may be restricted depending on platform needs. To
                            delete your account or personal data, please contact our staff at
                            esports@project.wdcc.co.nz. We currently retain personal data
                            indefinitely unless explicitly requested for deletion.
                        </p>
                        <h2 className="text-3xl">6. Data Security</h2>
                        <p className="">
                            All communication between the client and server is encrypted using
                            HTTPS. Sensitive information is protected using role-based access
                            control, and database access is limited to authorized staff only.
                            Credentials and environment variables are securely managed and not
                            exposed to the frontend.
                        </p>
                        <h2 className="text-3xl">7. Changes To This Policy</h2>
                        <p className="">
                            We may update this Privacy Policy from time to time. Changes will be
                            posted on this page, and your continued use of the Service indicates
                            your acceptance of the updated terms.
                        </p>
                        <h2 className="text-3xl">8. Contact</h2>
                        <div className="flex flex-col">
                            <p>If you have any questions or concerns, please reach out to:</p>
                            <a
                                href="esports@project.wdcc.co.nz"
                                className="underline-white hover:underline"
                            >
                                esports@project.wdcc.co.nz
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
