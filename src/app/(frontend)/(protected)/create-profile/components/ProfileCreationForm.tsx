"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileCreationDTO, ZProfileCreationDTO } from "@libs/types/profile.type";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Button from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { TosAndPolicy } from "@/components/text/TosAndPolicy";

import { ProfileCreationHeading } from "./ProfileCreationHeading";

export default function ProfileCreationForm() {
    const router = useRouter();

    const { register, handleSubmit } = useForm({
        // intial form state
        defaultValues: {
            firstName: "",
            lastName: "",
            // TODO: make inputfield for these
            university: "Unknown University",
            yearOfStudy: "Not at university" as const,
            gender: "other",
        },
        resolver: zodResolver(ZProfileCreationDTO),
    });

    const mutation = useMutation({
        mutationFn: (newProfile: ProfileCreationDTO) => {
            return fetch("/api/user/createProfile", {
                method: "POST",
                body: JSON.stringify(newProfile),
            });
        },
        onSuccess: () => {
            router.push("/profile");
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <div className="w-full max-w-md space-y-6">
                <ProfileCreationHeading />
                <div className="space-y-4">
                    <InputField {...register("firstName")} label="First Name" />
                    <InputField {...register("lastName")} label="Last Name" />
                    <Button
                        type="submit"
                        className="mt-12 w-full"
                        isLoading={mutation.isPending}
                        fallback="Creating profile..."
                    >
                        Continue
                    </Button>
                </div>
                <TosAndPolicy />
            </div>
        </form>
    );
}
