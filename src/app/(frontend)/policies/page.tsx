import React from "react";
import Image from "next/image";

import { AUECLogo } from "@/components/assets/image";
import { PageLayout } from "@/components/layout/PageLayout";
import { Navbar } from "@/components/navbar/Navbar";

import { PolicyButton } from "./_components/PolicyButton";

export default function page() {
    return (
        <PageLayout>
            <Navbar />
            <div className="font-satoshi flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-24">
                    <div className="flex flex-col items-center gap-6">
                        <Image
                            src={AUECLogo}
                            width={72}
                            height={72}
                            alt="Auckland University Esport Club Logo"
                        ></Image>
                        <div className="py-12">
                            <h1 className="font-tomorrow text-center text-6xl">
                                Auckland University
                                <br />
                                Esport Club
                            </h1>
                        </div>
                    </div>
                    <p className="text-center text-xl text-[#AFAFAF]">
                        Our various term and service agreement of what information we collect
                    </p>
                </div>
                <div className="flex flex-col items-center gap-6 md:flex-row">
                    <PolicyButton
                        title="Term and services"
                        policy="term and service agreement"
                        link="/policies/terms-and-services"
                    />
                    <PolicyButton
                        title="Privacy policy"
                        policy="privacy policy"
                        link="/policies/privacy-policy"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
