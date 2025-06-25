"use client";

import React from "react";
import PageLayout from "@ui/layout/PageLayout";

import { useProfile } from "./components/ProfileProvider";

const ClientPage = () => {
    const profile = useProfile();

    return (
        <PageLayout>
            <h1 className="text-3xl">Profile page</h1>
            <p>{JSON.stringify(profile, null, 2)}</p>
        </PageLayout>
    );
};

export default ClientPage;
