import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

export default function page() {
    return (
        <PageLayout>
            <div className="py-12">
                <div className="flex flex-col items-center">
                    <div className="py-6">
                        <div className="font-tomorrow py-12 text-[62px]">Privacy Policy</div>
                    </div>
                    <div className="py-6">
                        <div className="text-[20px] text-[#AFAFAF]">Last updated: 26 May 2025</div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex h-[1342px] w-[800px] flex-col gap-12 border border-black">
                        <div className="font-['Satoshi_Variable'] text-[20px] leading-none text-[#FFF]">
                            This Privacy Policy explains how the Auckland University Esports Club's
                            membership and tournament platform (“Service”), developed by WDCC{" "}
                            <strong>(Web Development and Consulting Club)</strong>, collects, uses,
                            and protects your personal information.
                        </div>

                        <div className="text-left font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            1. Information We Collect
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            When you register using Google OAuth, we collect the following data:
                            <br />
                            <ul className="list-inside list-disc">
                                <li>Your name</li>
                                <li>Your email address</li>
                                <li>Your Google profile image</li>
                            </ul>
                            We also use Google Analytics and other tracking tools to gather
                            anonymous usage statistics to improve our platform. We do not collect IP
                            addresses, device information, or any technical metadata.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            2. How We Use Your Data
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            We use your information solely to:
                            <br />
                            <ul className="list-inside list-disc">
                                <li>
                                    Confirm your identity for membership access and tournament
                                    participation
                                </li>
                                <li>Allow you to manage your account settings</li>
                                <li>Monitor platform usage for internal improvements</li>
                            </ul>
                            We do not share your personal data with any third parties.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            3. Data Storage
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            All data is stored securely on NeonDB, a third-party managed PostgreSQL
                            hosting provider. Authentication is handled using role-based session
                            cookies, and access to personal data is limited to authorized staff
                            members.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            4. Cookie and Tracking
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            We use cookies to manage your session and authentication. Google
                            Analytics and other tools may use cookies to collect anonymized usage
                            data.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            5. Your Rights
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            You may update your personal information at any time via your account
                            settings. Some fields may be restricted depending on platform needs. To
                            delete your account or personal data, please contact our staff at
                            esports@project.wdcc.co.nz. We currently retain personal data
                            indefinitely unless explicitly requested for deletion.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            6. Data Security
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            All communication between the client and server is encrypted using
                            HTTPS. Sensitive information is protected using role-based access
                            control, and database access is limited to authorized staff only.
                            Credentials and environment variables are securely managed and not
                            exposed to the frontend.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            7. Changes To This Policy
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            We may update this Privacy Policy from time to time. Changes will be
                            posted on this page, and your continued use of the Service indicates
                            your acceptance of the updated terms.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            8. Contact
                        </div>
                        <div className="pb-60">
                            <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                                If you have any questions or concerns, please reach out to:
                                <br />
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
            </div>
        </PageLayout>
    );
}
