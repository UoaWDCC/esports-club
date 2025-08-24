import React from "react";
import { ProfileDTO } from "@libs/types/profile.type";

import { Container } from "./Container";
import { ContentHeading } from "./ContentHeading";
import { InputField } from "./InputField";
import { TagsField } from "./TagsField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZProfileDTO } from "@libs/types/profile.type";

interface ProfileUpdateProps {
    profile: ProfileDTO;
}

export function ProfileUpdateForm({ profile }: ProfileUpdateProps) {
    const ProfileUpdateSchema = ZProfileDTO.omit({
        previousMember: true,
        tournamentPasses: true,
    });

    const  {
        register, setError, handleSubmit, formState: {errors}, } = useForm({ resolver: zodResolver(ZProfileDTO),

        });

        function onSubmit(data: Omit<ProfileDTO, "previousMember" | "tournamentPasses">) {
        const completeData: ProfileDTO = {
            ...data,
            previousMember: profile.previousMember,
            tournamentPasses: profile.tournamentPasses,
        };

        console.log("Complete profile data:", completeData);
    }
        
    return (
        <form>
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
                        {...register("firstName")}
                    />
                    <InputField
                        defaultValue={profile.lastName}
                        placeholder="e.g. Doe"
                        label="Last Name"
                        {...register("lastName")}
                    />
                </div>
                <InputField defaultValue={profile.email} label="Account Email" {...register("email")}/>
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
                    {...register("currentDegree")}
                />
                <InputField
                    defaultValue={profile?.currentStudy || ""}
                    placeholder="e.g. Computer Science"
                    label="Current Study"
                    {...register("currentStudy")}
                />
                <InputField
                    defaultValue={profile?.yearOfStudy || ""}
                    placeholder="e.g. Third year"
                    label="Year of Study"
                    {...register("yearOfStudy")}
                />
                <div className="flex gap-6">
                    <InputField
                        defaultValue={profile?.gender || ""}
                        placeholder="Male"
                        label="Gender"
                        {...register("gender")}
                    />
                    <InputField
                        defaultValue={profile?.ethnicity || ""}
                        placeholder="Chinese"
                        label="Ethnicity"
                        {...register("ethnicity")}
                    />
                </div>
            </Container>
        </form>
    );
}
