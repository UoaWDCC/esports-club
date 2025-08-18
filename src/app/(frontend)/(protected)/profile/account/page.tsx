"use client";

import { HTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "@libs/utils/class";

import { useProfile } from "../components/ProfileProvider";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function AccountPage() {
    const profile = useProfile();

    return (
        <div className="flex h-[2000px] flex-col gap-12">
            <h1 className="text-3xl">My Account</h1>
            <Container>
                <div className="flex justify-between">
                    <ContentHeading title="Profile details" description="Your account details" />
                    <button className="border-border rounded border px-6 py-3">Edit</button>
                </div>
                <InputField placeholder="e.g. XxJohnDoexX (C9)" label="Profile Name" disabled />
                <div className="flex gap-6">
                    <InputField
                        defaultValue={profile.firstName}
                        placeholder="e.g. John"
                        label="First Name"
                        disabled
                    />
                    <InputField
                        defaultValue={profile.lastName}
                        placeholder="e.g. Doe"
                        label="Last Name"
                        disabled
                    />
                </div>
                <InputField defaultValue={profile.email} label="Account Email" disabled />
            </Container>
            <Container>
                <div className="flex justify-between">
                    <ContentHeading
                        title="Event Preference"
                        description="We will notify events you are interested in"
                    />
                    <button className="border-border rounded border px-6 py-3">Edit</button>
                </div>
                <TagsField />
            </Container>
            <Container>
                <div className="flex justify-between">
                    <ContentHeading
                        title="Personal details"
                        description="Change your personal details"
                    />
                    <button className="border-border rounded border px-6 py-3">Edit</button>
                </div>
                <InputField
                    defaultValue={profile?.currentDegree || ""}
                    placeholder="e.g. Bachelor of Science"
                    label="Degree"
                />
                <InputField
                    defaultValue={profile?.currentStudy || ""}
                    placeholder="e.g. Computer Science"
                    label="Current Study"
                />
                <InputField
                    defaultValue={profile?.yearOfStudy || ""}
                    placeholder="e.g. Third year"
                    label="Year of Study"
                />
                <div className="flex gap-6">
                    <InputField
                        defaultValue={profile?.gender || ""}
                        placeholder="Male"
                        label="Gender"
                    />
                    <InputField
                        defaultValue={profile?.ethnicity || ""}
                        placeholder="Chinese"
                        label="Ethnicity"
                    />
                </div>
            </Container>
        </div>
    );
}

const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-muted-background flex flex-col gap-6 rounded-md p-6">{children}</div>;
};

const ContentHeading = ({ title, description }: { title: string; description: string }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3>{title}</h3>
            <p className="text-muted">{description}</p>
        </div>
    );
};

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputField = ({ label, ...props }: InputFieldProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <label>{label}</label>
            <input
                {...props}
                className={cn(
                    "border-border gap-3 rounded-md border py-3 pr-2 pl-6",
                    props.className,
                )}
            />
        </div>
    );
};

const TagsField = () => {
    return (
        <div className="flex w-full flex-col gap-1">
            <label>Tags</label>
            <div className="border-border flex gap-3 rounded-md border p-3">
                <Tags label="Tournament" className="border-[#E771FF] bg-[#773184] text-[#E771FF]" />
                <Tags label="Social" className="border-[#A071FF] bg-[#343184] text-[#A071FF]" />
                <Tags label="Valorant" className="border-[#FF7184] bg-[#84313C] text-[#FF7184]" />
            </div>
        </div>
    );
};

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
}

const Tags = ({ label = "Tag", className, ...props }: TagProps) => {
    return (
        <div {...props} className={cn("border-border rounded-full border px-3", className)}>
            {label}
        </div>
    );
};
