import React from "react";

import { Table } from "@/components/table";

import { MemberList } from "./MemberList";

export const MemberTable = () => {
    return (
        <Table.Root>
            <MemberTableHeading />
            <Table.Body>
                <MemberList />
            </Table.Body>
        </Table.Root>
    );
};

const MemberTableHeading = () => (
    <Table.Heading>
        <th></th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Id</th>
    </Table.Heading>
);
