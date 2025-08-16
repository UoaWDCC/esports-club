"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ZMembershipTypeEditRequest } from "@/app/api/membership-type.edit/type";
import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { MembershipType } from "@/libs/types/membershipType.type";

interface InlineEditFormProps {
    membershipType: MembershipType;
    onSubmit: (data: any) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export function InlineEditForm({
    membershipType,
    onSubmit,
    onCancel,
    isLoading = false,
}: InlineEditFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ZMembershipTypeEditRequest),
        defaultValues: {
            name: "",
            description: "",
            startAt: "",
            endAt: "",
            price: 0,
            isActive: true,
        },
    });

    useEffect(() => {
        setValue("name", membershipType.name);
        setValue("description", membershipType.description || "");

        // Handle dates safely - they might still be strings from the cache
        const startDate = (() => {
            try {
                return membershipType.startAt instanceof Date
                    ? membershipType.startAt.toISOString().slice(0, 16)
                    : new Date(membershipType.startAt).toISOString().slice(0, 16);
            } catch (error) {
                console.error("Error parsing start date:", error);
                return new Date().toISOString().slice(0, 16);
            }
        })();

        const endDate = (() => {
            try {
                return membershipType.endAt instanceof Date
                    ? membershipType.endAt.toISOString().slice(0, 16)
                    : new Date(membershipType.endAt).toISOString().slice(0, 16);
            } catch (error) {
                console.error("Error parsing end date:", error);
                return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16); // Tomorrow
            }
        })();

        setValue("startAt", startDate);
        setValue("endAt", endDate);
        setValue("price", membershipType.price / 100); // Convert from cents to dollars
        setValue("isActive", membershipType.isActive);
    }, [membershipType, setValue]);

    const handleFormSubmit = handleSubmit((data) => {
        console.log("Form submitted with data:", data);

        // Convert price from dollars to cents if needed
        const formData: any = {
            ...data,
            id: membershipType.id,
            price: Math.round(data.price * 100), // Convert to cents
        };

        console.log("Processed form data:", formData);
        onSubmit(formData);
    });

    return (
        <form
            onSubmit={handleFormSubmit}
            className="space-y-3 rounded border border-blue-200 bg-blue-50 p-3 text-neutral-950"
        >
            <div className="grid grid-cols-6 items-center gap-4">
                {/* Name column */}
                <div>
                    <InputField
                        {...register("name")}
                        label=""
                        placeholder="Name"
                        error={errors.name?.message}
                        className="text-sm"
                    />
                </div>

                {/* Description column */}
                <div>
                    <InputField
                        {...register("description")}
                        label=""
                        placeholder="Description"
                        error={errors.description?.message}
                        className="text-sm"
                    />
                </div>

                {/* Price column */}
                <div>
                    <InputField
                        {...register("price", { valueAsNumber: true })}
                        label=""
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Price"
                        error={errors.price?.message}
                        className="text-sm"
                    />
                </div>

                {/* Period column - Start Date */}
                <div>
                    <InputField
                        {...register("startAt")}
                        label=""
                        type="datetime-local"
                        error={errors.startAt?.message}
                        className="text-sm"
                    />
                </div>

                {/* Period column - End Date */}
                <div>
                    <InputField
                        {...register("endAt")}
                        label=""
                        type="datetime-local"
                        error={errors.endAt?.message}
                        className="text-sm"
                    />
                </div>

                {/* Status column */}
                <div className="flex items-center space-x-2">
                    <input
                        {...register("isActive")}
                        type="checkbox"
                        id={`isActive-${membershipType.id}`}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                        htmlFor={`isActive-${membershipType.id}`}
                        className="text-sm text-gray-700"
                    >
                        Active
                    </label>
                </div>
            </div>

            {/* Action buttons - positioned below the form fields */}
            <div className="flex justify-end space-x-2 border-t border-blue-200 pt-2">
                <Button
                    type="button"
                    variant={{ style: "secondary" }}
                    onClick={onCancel}
                    disabled={isLoading}
                    className="px-3 py-1 text-sm"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    fallback="Saving..."
                    className="px-3 py-1 text-sm"
                >
                    Save
                </Button>
            </div>
        </form>
    );
}
