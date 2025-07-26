import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

export default function page() {
    return (
        <PageLayout>
            <div className="py-12 text-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-tomorrow py-18 text-6xl">Terms and Services</h1>
                    <h2 className="py-6 text-[#AFAFAF]">Last updated: 26 May 2025</h2>
                </div>

                <div className="font-satoshi flex flex-col items-center">
                    <div className="flex w-full max-w-[800px] flex-col gap-12 border border-black">
                        <p className="leading-none">
                            Welcome to the Auckland University Esports Club's membership and
                            tournament platform (“Service”), developed by WDCC{" "}
                            <strong>(Web Development and Consulting Club)</strong>. By accessing or
                            using the Service, you agree to the following terms.
                        </p>

                        <h2 className="text-left text-3xl">1. Eligibity</h2>
                        <p>
                            This Service is open to users of all ages. To register, you must sign in
                            using Google OAuth.
                        </p>
                        <h2 className="text-3xl">2. Membership & Fees</h2>
                        <p>
                            Access to certain features, such as joining the club or participating in
                            tournaments, may require a paid membership. All payments are final;
                            refunds are not available. For issues, please contact staff at
                            esports@project.wdcc.co.nz.
                        </p>
                        <h2 className="text-3xl">3. User Accounts</h2>
                        <p>
                            By registering, you agree to provide accurate information including your
                            name, email, and profile image via Google. You are responsible for your
                            account's security.
                        </p>
                        <h2 className="text-3xl">4. User Content</h2>
                        <p>
                            This platform does not support user-generated content. All routes and
                            interactions are limited to official club communications and
                            staff-managed content.
                        </p>
                        <h2 className="text-3xl">5. Privacy</h2>
                        <p>
                            We collect limited personal data (name, email, image) for identification
                            and administrative purposes. Your data will not be shared without
                            consent, except where required by law. See our Privacy Policy for more
                            details.
                        </p>
                        <h2 className="text-3xl">6. Third-Party Links</h2>
                        <p>
                            This Service may include links or integrations with third-party tools in
                            the future. We are not responsible for the content or practices of these
                            services.
                        </p>
                        <h2 className="text-3xl">7. Modifications</h2>
                        <p>
                            WDCC reserves the right to update or change these Terms at any time.
                            Continued use of Service means you accept the latest version.
                        </p>
                        <h2 className="text-3xl">8. Contact</h2>
                        <div className="pb-20">
                            For support or questions, contact us at{" "}
                            <a
                                href="esports@project.wdcc.co.nz"
                                className="underline-white xl hover:underline"
                            >
                                esports@project.wdcc.co.nz.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
