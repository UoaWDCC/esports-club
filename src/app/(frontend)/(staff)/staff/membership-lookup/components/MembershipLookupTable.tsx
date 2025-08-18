import React from "react";

import { Table } from "@/components/table";

import { MembershipLookupList } from "./MembershipLookupList";
import { MembershipLookupPagination } from "./MembershipLookupPagination";
import { MembershipLookupTableHeading } from "./MembershipLookupRow";

export const MembershipLookupTable = () => {
    return (
        <Table.Root>
            <Table.Heading>
                <MembershipLookupTableHeading />
            </Table.Heading>
            <Table.Body>
                <MembershipLookupList />
            </Table.Body>
        </Table.Root>
    );
};
