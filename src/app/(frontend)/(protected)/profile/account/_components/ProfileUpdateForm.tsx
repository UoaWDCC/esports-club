import React from "react";
import { ProfileDTO } from "@libs/types/profile.type";

import { Container } from "./Container";
import { ContentHeading } from "./ContentHeading";
import { InputField } from "./InputField";
import { TagsField } from "./TagsField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZProfileDTO } from "@libs/types/profile.type";
import { useProfileUpdateMutation } from "@/app/api/profile.update/query";


interface ProfileUpdateProps {
    profile: ProfileDTO;
}

export function ProfileUpdateForm({ profile }: ProfileUpdateProps) {
    const ProfileUpdateSchema = ZProfileDTO.omit({
        previousMember: true,
        tournamentPasses: true,
    });

    const ProfileUpdateMutation = useProfileUpdateMutation();
    const  {
        register, setError, handleSubmit, formState: {errors}, } = useForm({ resolver: zodResolver(ZProfileDTO),
            defaultValues:{
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                currentDegree: profile.currentDegree || "",
                currentStudy: profile.currentStudy || "",
                yearOfStudy: profile.yearOfStudy || "",
                gender: profile.gender || "",
                ethnicity: profile.ethnicity || "",
                university: profile.university || ""
            }

        });

        function onSubmit(data: Omit<ProfileDTO, "previousMember" | "tournamentPasses">) {
        console.log("Hello")
        const completeData: ProfileDTO = {
            ...data,
            previousMember: profile.previousMember,
            tournamentPasses: profile.tournamentPasses,
        };

        console.log("Complete profile data:", completeData);

        ProfileUpdateMutation.mutate(completeData, {
            onSuccess: (response) => {
                console.log("Profile updated successfully!", response);
                // You can add success notification here
            },
            onError: (error) => {
                console.error("Failed to update profile:", error);
                setError("root", { message: error.message });
            },
        });
        
    }
        
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Container>
                <div className="flex justify-between">
                    <ContentHeading title="Profile details" description="Your account details" />
                    <button className="border-border rounded border px-6 py-3">Edit</button>
                </div>
                <div className="flex gap-6">
                    <InputField
                        defaultValue={profile.firstName}
                        placeholder="e.g. John"
                        label="First Name"
                        error={errors.firstName?.message}
                        {...register("firstName")}
                    />
                    <InputField
                        defaultValue={profile.lastName}
                        placeholder="e.g. Doe"
                        label="Last Name"
                        error={errors.lastName?.message}
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
                    error={errors.currentDegree?.message}
                    {...register("currentDegree")}
                />
                <InputField
                    defaultValue={profile?.currentStudy || ""}
                    placeholder="e.g. Computer Science"
                    label="Current Study"
                    error={errors.currentStudy?.message}
                    {...register("currentStudy")}
                />
                <InputField
                    defaultValue={profile?.yearOfStudy || ""}
                    placeholder="e.g. Third year"
                    label="Year of Study"
                    error={errors.yearOfStudy?.message}
                    {...register("yearOfStudy")}
                />
                <div className="flex gap-6">
                    <InputField
                        defaultValue={profile?.gender || ""}
                        placeholder="Male"
                        label="Gender"
                        error={errors.gender?.message}
                        {...register("gender")}
                    />
                    <InputField
                        defaultValue={profile?.ethnicity || ""}
                        placeholder="Chinese"
                        label="Ethnicity"
                        error={errors.ethnicity?.message}
                        {...register("ethnicity")}
                    />
                </div>
            </Container>
            <button type="submit">Submit</button>
        </form>
    );
}
