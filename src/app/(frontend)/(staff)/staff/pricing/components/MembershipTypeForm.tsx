"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ZMembershipTypeAddRequest } from "@/app/api/membership-type.add/type";
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

interface MembershipTypeFormProps {
    membershipType?: MembershipType;
    onSubmit: (data: MembershipTypeFormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export function MembershipTypeForm({
    membershipType,
    onSubmit,
    onCancel,
    isLoading = false,
}: MembershipTypeFormProps) {
    const isEditing = !!membershipType;
    const schema = isEditing ? ZMembershipTypeUpdateRequest : ZMembershipTypeAddRequest;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
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
        if (membershipType) {
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
        }
    }, [membershipType, setValue]);

    const handleFormSubmit = handleSubmit((data) => {
        // Convert price from dollars to cents if needed
        const formData: MembershipTypeFormData = {
            ...data,
            price: Math.round(data.price * 100), // Convert to cents
        };

        if (isEditing && membershipType) {
            formData.id = membershipType.id;
        }

        onSubmit(formData);
    });

    const handleCancel = () => {
        reset();
        onCancel();
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-4">
            {isEditing && (
                <input
                    type="hidden"
                    value={membershipType.id}
                    onChange={() => {
                        // This is handled in the form submission
                    }}
                />
            )}

            <InputField
                {...register("name")}
                label="Name"
                placeholder="Enter membership type name"
                error={errors.name?.message}
            />

            <InputField
                {...register("description")}
                label="Description"
                placeholder="Enter description (optional)"
                error={errors.description?.message}
            />

            <div className="grid grid-cols-2 gap-4">
                <InputField
                    {...register("startAt")}
                    label="Start Date"
                    type="datetime-local"
                    error={errors.startAt?.message}
                />

                <InputField
                    {...register("endAt")}
                    label="End Date"
                    type="datetime-local"
                    error={errors.endAt?.message}
                />
            </div>

            <InputField
                {...register("price", { valueAsNumber: true })}
                label="Price ($)"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                error={errors.price?.message}
            />

            <div className="flex items-center space-x-2">
                <input
                    {...register("isActive")}
                    type="checkbox"
                    id="isActive"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active
                </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button
                    type="button"
                    variant={{ style: "secondary" }}
                    onClick={handleCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    fallback={isEditing ? "Updating..." : "Creating..."}
                >
                    {isEditing ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    );
}
