import React from "react";
import Image from "next/image";

import { AUECLogo } from "@/components/assets/image";
import { PageLayout } from "@/components/layout/PageLayout";

export default function page() {
    return (
        <PageLayout>
            <div className="flex flex-col items-center gap-24">
                <div className="flex flex-col items-center gap-6">
                    <Image
                        src={AUECLogo}
                        width={72}
                        height={72}
                        alt="Auckland University Esport Club Logo"
                    ></Image>
                    <h1 className="font-tomorrow text-center text-6xl">
                        Auckland University Esport Club
                    </h1>
                </div>
                <p className="text-center text-gray-600">
                    Our various term and service agreement of what information we collect
                </p>
            </div>
            <div className="flex gap-10">
                <PolicyButton title="Term and services" policy="term and service agreement" />
                <PolicyButton title="Privacy policy" policy="privacy policy" />
            </div>
        </PageLayout>
    );
}

interface PolicyButtonProps {
    title: string;
    policy: string;
}

function PolicyButton({ title, policy }: PolicyButtonProps) {
    return (
        <div className="border-purple flex w-fit flex-col gap-6 rounded-lg border p-6">
            <p>{title}</p>
            <p className="text-gray-600">
                Our {policy}.
                <br />
                Last updated on December 19, 2024.
            </p>
            <a className="w-[340px]">View</a>
        </div>
    );
}
