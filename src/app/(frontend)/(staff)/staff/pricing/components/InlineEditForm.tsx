"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ZMembershipTypeUpdateRequest } from "@/app/api/membership-type.update/type";
import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { MembershipType } from "@/libs/types/membershipType.type";

type MembershipTypeFormData = Pick<
    MembershipType,
    "name" | "description" | "price" | "startAt" | "endAt" | "isActive"
> & {
    id?: string;
};

interface InlineEditFormProps {
    membershipType: MembershipType;
    onSubmit: (data: MembershipTypeFormData) => void;
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
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(ZMembershipTypeUpdateRequest),
        defaultValues: {
            id: membershipType.id,
            name: "",
            description: "",
            startAt: "",
            endAt: "",
            price: 0,
            isActive: true,
        },
        mode: "onChange",
    });

    useEffect(() => {
        setValue("name", membershipType.name);
        setValue("description", membershipType.description || "");

        const formatDateForInput = (dateValue: Date | string): string => {
            try {
                const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
                // Check if date is valid
                if (isNaN(date.getTime())) {
                    throw new Error("Invalid date");
                }
                // Format as YYYY-MM-DDTHH:mm for datetime-local input
                return date.toISOString().slice(0, 16);
            } catch (error) {
                console.error("Error parsing date:", error);
                return new Date().toISOString().slice(0, 16);
            }
        };

        const startDate = formatDateForInput(membershipType.startAt);
        const endDate = formatDateForInput(membershipType.endAt);

        setValue("startAt", startDate);
        setValue("endAt", endDate);
        setValue("price", Number((membershipType.price / 100).toFixed(2))); // Convert from cents to dollars with 2 decimal places
        setValue("isActive", membershipType.isActive);
    }, [membershipType, setValue]);

    const handleFormSubmit = handleSubmit(
        (data) => {
            console.log("Form submitted with data:", data);

            // Convert price from dollars to cents and ensure it's an integer
            const priceInCents = Math.round(Number(data.price) * 100);

            const formData = {
                ...data,
                id: membershipType.id,
                price: priceInCents,
                startAt: data.startAt,
                endAt: data.endAt,
            };

            console.log("Processed form data:", formData);
            onSubmit(formData);
        },
        (errors) => {
            console.error("Form validation errors:", errors);
        },
    );

    return (
        <form
            onSubmit={handleFormSubmit}
            className="space-y-3 rounded border border-blue-200 bg-blue-50 p-3 text-neutral-950"
        >
            <input type="hidden" {...register("id")} />

            <div className="grid grid-cols-6 items-center gap-4">
                <div>
                    <InputField
                        {...register("name", {
                            required: "Name is required",
                        })}
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

                <div>
                    <InputField
                        {...register("price", {
                            valueAsNumber: true,
                            required: "Price is required",
                        })}
                        label=""
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Price"
                        error={errors.price?.message}
                        className="text-sm"
                    />
                </div>

                <div>
                    <InputField
                        {...register("startAt", {
                            required: "Start date is required",
                        })}
                        label=""
                        type="datetime-local"
                        error={errors.startAt?.message}
                        className="text-sm"
                    />
                </div>

                <div>
                    <InputField
                        {...register("endAt", {
                            required: "End date is required",
                        })}
                        label=""
                        type="datetime-local"
                        error={errors.endAt?.message}
                        className="text-sm"
                    />
                </div>

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

            <div className="flex justify-end space-x-2 border-t border-blue-200 pt-2">
                {Object.keys(errors).length > 0 && (
                    <div className="mr-auto text-sm text-red-600">
                        Form has errors: {Object.keys(errors).join(", ")}
                    </div>
                )}
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
                    disabled={!isValid}
                >
                    Save
                </Button>
            </div>
        </form>
    );
}
