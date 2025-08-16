import React from "react";

import { Table } from "@/components/table";

import { MemberList } from "./MemberList";
import { MemberTableHeading } from "./MemberRow";

export const MemberTable = () => {
    return (
        <Table.Root>
            <Table.Heading>
                <MemberTableHeading />
            </Table.Heading>
            <Table.Body>
                <MemberList />
            </Table.Body>
        </Table.Root>
    );
};
