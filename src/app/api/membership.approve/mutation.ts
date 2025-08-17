"use client";

import { useMutation } from "@tanstack/react-query";

import { MembershipApproveRouteRequest, ZMembershipApproveRouteRequest } from "./type";

export const useMemberApprovalMutation = () => {
    const mutation = useMutation({
        mutationFn: mutateApproveMember,
        mutationKey: ["member-approval"],
    });

    return mutation;
};

const mutateApproveMember = async (req: MembershipApproveRouteRequest) => {
    const body = ZMembershipApproveRouteRequest.parse(req);

    return await fetch("/api/membership.approve", {
        method: "POST",
        body: JSON.stringify(body),
    });
};
