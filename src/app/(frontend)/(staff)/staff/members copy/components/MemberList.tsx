"use client";

import { useMemberListQuery } from "@/app/api/member.all/query";

import { MemberRow } from "./MemberRow";

export const MemberList = () => {
    const { data, error, isLoading, isError } = useMemberListQuery();

    if (isLoading) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    Loading...
                </td>
            </tr>
        );
    }

    if (isError) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    {error.message}
                </td>
            </tr>
        );
    }

    if (!data) {
        return (
            <tr>
                <td colSpan={6} className="text-center">
                    No data
                </td>
            </tr>
        );
    }

    const { members } = data;

    return members.map((member, index) => (
        <MemberRow key={index} member={member} index={index + 1} />
    ));
};
