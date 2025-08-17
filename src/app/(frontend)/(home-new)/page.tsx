import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

import { Hero } from "./_components/Hero/Hero";
import Sponsors from "./_components/Sponsors/Sponsors";

export default function page() {
    return (
        <PageLayout>
            <Hero />
            <Sponsors />
        </PageLayout>
    );
}
