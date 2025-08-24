"use client";

import { HTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "@libs/utils/class";

import { useProfile } from "../components/ProfileProvider";
import { ProfileUpdateForm } from "./_components/ProfileUpdateForm";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function AccountPage() {
    const profile = useProfile();

    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-3xl">My Account</h1>
            <ProfileUpdateForm profile = {profile}/>
        </div>
    );
}




