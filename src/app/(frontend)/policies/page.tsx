import React from "react";
import Image from "next/image";

import { AUECLogo } from "@/components/assets/image";
import { PageLayout } from "@/components/layout/PageLayout";

export default function page() {
    return (
        <PageLayout>
            <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-24">
                    <div className="flex flex-col items-center gap-6">
                        <Image
                            src={AUECLogo}
                            width={72}
                            height={72}
                            alt="Auckland University Esport Club Logo"
                        ></Image>
                        <div className="py-12">
                            <h1 className="font-tomorrow text-center text-[64px] text-[#FFF]">
                                Auckland University
                                <br />
                                Esport Club
                            </h1>
                        </div>
                    </div>
                    <p className="text-center font-['Satoshi_Variable'] text-[20px] text-[#AFAFAF]">
                        Our various term and service agreement of what information we collect
                    </p>
                </div>
                <div className="flex items-center gap-6 pb-20">
                    <PolicyButton
                        title="Term and services"
                        policy="term and service agreement"
                        link="./policies/terms-and-services"
                    />
                    <PolicyButton
                        title="Privacy policy"
                        policy="privacy policy"
                        link="./policies/privacy-policy"
                    />
                </div>
            </div>
        </PageLayout>
    );
}

interface PolicyButtonProps {
    title: string;
    policy: string;
    link: string;
}

function PolicyButton({ title, policy, link }: PolicyButtonProps) {
    return (
        <div className="flex w-fit flex-col gap-6 rounded-lg border-2 border-[#978FFE] p-6">
            <p className="font-['Satoshi_Variable'] text-[20px] leading-none">{title}</p>
            <p className="font-['Satoshi_Variable'] text-[16px] leading-none text-[#AFAFAF]">
                Our {policy}.
                <br />
                Last updated on December 19, 2024.
            </p>
            <a
                className="w-[340px] font-['Satoshi_Variable'] text-[14px] text-[#978FFE] hover:underline"
                href="{link}"
            >
                View
            </a>
        </div>
    );
}
