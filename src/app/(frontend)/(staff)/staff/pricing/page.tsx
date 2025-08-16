"use client";

import React from "react";

import { useMembershipTypeListQuery } from "@/app/api/membership-type.get.list/query";
import { MembershipType } from "@/libs/types/membershipType.type";

export default function PricingPage() {
    const { data, isLoading } = useMembershipTypeListQuery(true);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Membership Types</h1>
            {data?.data && (
                <div>
                    {data.data.map((membershipType: MembershipType) => (
                        <div key={membershipType.id}>
                            <h3>{membershipType.name}</h3>
                            <p>{membershipType.description}</p>
                            <p>Price: ${membershipType.price}</p>
                            <p>Active: {membershipType.isActive ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
