import React from "react";

import { Table } from "@/components/table";

import { ApproveMemberList } from "./ApproveMemberList";
import { ApproveMemberTableHeading } from "./ApproveMemberRow";

export const ApproveMemberTable = () => {
    return (
        <Table.Root>
            <Table.Heading>
                <ApproveMemberTableHeading />
            </Table.Heading>
            <Table.Body>
                <ApproveMemberList />
            </Table.Body>
        </Table.Root>
    );
};
