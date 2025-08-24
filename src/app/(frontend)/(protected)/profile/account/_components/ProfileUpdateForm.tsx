import React from "react";
import { ProfileDTO } from "@libs/types/profile.type";

import { Container } from "./Container";
import { ContentHeading } from "./ContentHeading";
import { InputField } from "./InputField";
import { TagsField } from "./TagsField";

interface ProfileUpdateProps {
    profile: ProfileDTO;
}

export function ProfileUpdateForm({ profile }: ProfileUpdateProps) {
    return (
        <div>
            <Container>
                <div className="flex justify-between">
                    <ContentHeading title="Profile details" description="Your account details" />
                    <button className="border-border rounded border px-6 py-3">Edit</button>
                </div>
                <InputField placeholder="e.g. XxJohnDoexX (C9)" label="Profile Name" />
                <div className="flex gap-6">
                    <InputField
                        defaultValue={profile.firstName}
                        placeholder="e.g. John"
                        label="First Name"
                    />
                    <InputField
                        defaultValue={profile.lastName}
                        placeholder="e.g. Doe"
                        label="Last Name"
                    />
                </div>
                <InputField defaultValue={profile.email} label="Account Email" />
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
