"use client";

import { useMutation } from "@tanstack/react-query";

import { MembershipRejectRouteRequest, ZMembershipRejectRouteRequest } from "./type";

export const useMemberRejectMutation = () => {
    const mutation = useMutation({
        mutationFn: mutateApproveMember,
        mutationKey: ["member-reject"],
    });

    return mutation;
};

const mutateApproveMember = async (req: MembershipRejectRouteRequest) => {
    const body = ZMembershipRejectRouteRequest.parse(req);

    return await fetch("/api/membership.reject", {
        method: "POST",
        body: JSON.stringify(body),
    });
};
