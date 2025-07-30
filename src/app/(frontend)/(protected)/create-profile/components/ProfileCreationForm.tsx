"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleResponse } from "@libs/api/utils";
import { ProfileCreationDTO, ZProfileCreationDTO } from "@libs/types/profile.type";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { TosAndPolicy } from "@/components/text/TosAndPolicy";

import { ProfileCreationHeading } from "./ProfileCreationHeading";

export function ProfileCreationForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        // initial form state
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
        mutationFn: async (newProfile: ProfileCreationDTO) => {
            const response = await fetch("/api/profile.create", {
                method: "POST",
                body: JSON.stringify(newProfile),
            });

            return handleResponse(response);
        },
        onSuccess: () => {
            router.refresh();
        },
        onError: (e) => {
            setError("firstName", { message: " " });
            setError("lastName", { message: e.message });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <div className="w-full max-w-md space-y-3">
                <ProfileCreationHeading />
                <div className="space-y-3">
                    <InputField
                        {...register("firstName")}
                        error={errors.firstName?.message}
                        label="First Name"
                    />
                    <InputField
                        {...register("lastName")}
                        error={errors.lastName?.message}
                        label="Last Name"
                    />
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
