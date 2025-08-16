"use client";

import React, { useState } from "react";

import { useMembershipTypeAddMutation } from "@/app/api/membership-type.add/query";
import { useMembershipTypeDeleteMutation } from "@/app/api/membership-type.delete/query";
import { useMembershipTypeEditMutation } from "@/app/api/membership-type.edit/query";
import { useMembershipTypeListQuery } from "@/app/api/membership-type.get.list/query";
import { Button } from "@/components/button/Button";
import { MembershipType } from "@/libs/types/membershipType.type";

import { InlineEditForm } from "./InlineEditForm";
import { MembershipTypeForm } from "./MembershipTypeForm";

export function MembershipTypeCRUD() {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, isLoading, error } = useMembershipTypeListQuery(true);
    const addMutation = useMembershipTypeAddMutation();
    const editMutation = useMembershipTypeEditMutation();
    const deleteMutation = useMembershipTypeDeleteMutation();

    const handleAdd = () => {
        setIsAdding(true);
        setShowForm(true);
    };

    const handleEdit = (id: string) => {
        setEditingId(id);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this membership type?")) {
            try {
                await deleteMutation.mutateAsync({ id });
            } catch (error) {
                console.error("Failed to delete membership type:", error);
            }
        }
    };

    const handleFormSubmit = async (formData: any) => {
        console.log("CRUD handleFormSubmit called with:", formData);
        try {
            // Check if this is an edit operation by looking for an ID
            if (formData.id) {
                console.log("Processing edit operation for ID:", formData.id);
                await editMutation.mutateAsync(formData);
                setEditingId(null);
            } else {
                // No ID means it's a new membership type
                console.log("Processing add operation");
                await addMutation.mutateAsync(formData);
                setShowForm(false);
                setIsAdding(false);
            }
        } catch (error) {
            console.error("Failed to save membership type:", error);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setIsAdding(false);
    };

    const handleEditCancel = () => {
        setEditingId(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading membership types: {error.message}</div>;
    }

    const membershipTypes = data?.data || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Membership Types</h1>
                <Button onClick={handleAdd} disabled={showForm}>
                    Add New Membership Type
                </Button>
            </div>

            {showForm && (
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">Add New Membership Type</h2>
                    <MembershipTypeForm
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancel}
                        isLoading={addMutation.isPending}
                    />
                </div>
            )}

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Period
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {membershipTypes.map((membershipType: MembershipType) => (
                            <tr key={membershipType.id} className="hover:bg-gray-50">
                                {editingId === membershipType.id ? (
                                    // Inline edit row - span all columns
                                    <td colSpan={6} className="px-6 py-4">
                                        <InlineEditForm
                                            membershipType={membershipType}
                                            onSubmit={handleFormSubmit}
                                            onCancel={handleEditCancel}
                                            isLoading={editMutation.isPending}
                                        />
                                    </td>
                                ) : (
                                    // Normal display row
                                    <>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                            {membershipType.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {membershipType.description || "No description"}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                            ${(membershipType.price / 100).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {new Date(membershipType.startAt).toLocaleDateString()}{" "}
                                            - {new Date(membershipType.endAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                    membershipType.isActive
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {membershipType.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <Button
                                                variant={{ style: "secondary" }}
                                                onClick={() => handleEdit(membershipType.id)}
                                                disabled={showForm}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant={{ style: "secondary" }}
                                                onClick={() => handleDelete(membershipType.id)}
                                                disabled={showForm || deleteMutation.isPending}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
