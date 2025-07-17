import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

export default function page() {
    return (
        <PageLayout>
            <div className="py-12">
                <div className="flex flex-col items-center">
                    <div className="py-6">
                        <div className="font-tomorrow py-12 text-[62px]">Terms and Services</div>
                    </div>
                    <div className="py-6">
                        <div className="text-[20px] text-[#AFAFAF]">Last updated: 26 May 2025</div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex h-[1342px] w-[800px] flex-col gap-12 border border-black">
                        <div className="font-['Satoshi_Variable'] text-[20px] leading-none text-[#FFF]">
                            Welcome to the Auckland University Esports Club's membership and
                            tournament platform (“Service”), developed by WDCC{" "}
                            <strong>(Web Development and Consulting Club)</strong>. By accessing or
                            using the Service, you agree to the following terms.
                        </div>

                        <div className="text-left font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            1. Eligibity
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            This Service is open to users of all ages. To register, you must sign in
                            using Google OAuth.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            2. Membership & Fees
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            Access to certain features, such as joining the club or participating in
                            tournaments, may require a paid membership. All payments are final;
                            refunds are not available. For issues, please contact staff at
                            esports@project.wdcc.co.nz.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            3. User Accounts
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            By registering, you agree to provide accurate information including your
                            name, email, and profile image via Google. You are responsible for your
                            account's security.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            4. User Content
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            This platform does not support user-generated content. All routes and
                            interactions are limited to official club communications and
                            staff-managed content.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            5. Privacy
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            We collect limited personal data (name, email, image) for identification
                            and administrative purposes. Your data will not be shared without
                            consent, except where required by law. See our Privacy Policy for more
                            details.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            6. Third-Party Links
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            This Service may include links or integrations with third-party tools in
                            the future. We are not responsible for the content or practices of these
                            services.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            7. Modifications
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                            WDCC reserves the right to update or change these Terms at any time.
                            Continued use of Service means you accept the latest version.
                        </div>
                        <div className="font-['Satoshi_Variable'] text-[32px] font-[700] text-[#FFF]">
                            8. Contact
                        </div>
                        <div className="pb-20">
                            <div className="font-['Satoshi_Variable'] text-[20px] text-[#FFF]">
                                For support or questions, contact us at{" "}
                                <a
                                    href="esports@project.wdcc.co.nz"
                                    className="underline-white hover:underline"
                                >
                                    esports@project.wdcc.co.nz.
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
