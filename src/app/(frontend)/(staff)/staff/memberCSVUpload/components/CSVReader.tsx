"use client";

import React, { useState } from "react";
import { PaymentMethod } from "@libs/types/invoice.type";
import { ProfileDTO } from "@libs/types/profile.type";
import Button from "@ui/button/Button";
import Papa from "papaparse";

import { validateProfile } from "@/services/profile/validateProfile";

import { generateMemberProfile } from "../services/tempGenerateMemberProfile";
import { parseMembership } from "../utils/parseMembership";
import { parseProfile } from "../utils/parseProfile";

export type MemberData = {
    profile: ProfileDTO;
    membership: {
        paymentMethod: PaymentMethod;
        membershipTypeId: string;
        hasPaid: boolean;
    };
};

export const CSVReader = () => {
    const [csvData, setCSVData] = useState<MemberData[]>([]);
    const [malformedcsvData, setMalformedCSVData] = useState<ProfileDTO[]>([]);

    const submitMembers = () => {
        console.log(csvData);
        csvData.map((member) => {
            generateMemberProfile(member);
        });
    };

    async function resultsParse(results: string[][]) {
        const tempMemberData: MemberData[] = [];
        const tempMalformedData: ProfileDTO[] = [];
        await Promise.all(
            results.map(async (raw, index) => {
                // Input sanitation to avoid errors
                if (index == 0) return;

                const newProfile = parseProfile(raw);
                if (!newProfile) return;

                const Newmembership = parseMembership(raw);
                if (!Newmembership) return;

                // Input sanitation ends and ask Server to Validate the profile
                const valid = await validateProfile(newProfile);
                if (valid.error) {
                    console.log("MALFORMED ROW:");
                    console.log(valid.details);
                    tempMalformedData.push(newProfile);
                }

                if (valid.success) {
                    tempMemberData.push({ profile: newProfile, membership: Newmembership });
                }
            }),
        );

        setCSVData(tempMemberData);
        setMalformedCSVData(tempMalformedData);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        Papa.parse<string[]>(file, {
            header: false,
            dynamicTyping: true,
            complete: (results) => {
                resultsParse(results.data);
            },
        });
    };

    return (
        <div>
            <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
                Upload File
            </label>
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
            />

            <h1>Malformed Rows</h1>
            <table>
                <tbody>
                    <tr>
                        <th> First Names </th>
                        <th> Last Name </th>
                        <th> Email </th>
                        <th> Member Last Year </th>
                        <th> Student ID </th>
                        <th> Year Of Study </th>
                        <th> Gender </th>
                        <th> Ethnicity </th>
                        <th> Studying </th>
                    </tr>

                    {malformedcsvData.map((member, index) => {
                        return (
                            <tr key={index}>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.email}</td>
                                <td>{member.previousMember?.toString()}</td>
                                <td>{member.universityId}</td>
                                <td>{member.yearOfStudy?.toString()}</td>
                                <td>{member.gender?.toString()}</td>
                                <td>{member.ethnicity}</td>
                                <td>{member.currentStudy}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h1>CORRECT ROWS</h1>
            <table>
                <tbody>
                    <tr>
                        <th> First Names </th>
                        <th> Last Name </th>
                        <th> Email </th>
                        <th> Member Last Year </th>
                        <th> Student ID </th>
                        <th> Year Of Study </th>
                        <th> Gender </th>
                        <th> Ethnicity </th>
                        <th> Studying </th>
                    </tr>

                    {csvData.map((member, index) => {
                        return (
                            <tr key={index}>
                                <td>{member.profile.firstName}</td>
                                <td>{member.profile.lastName}</td>
                                <td>{member.profile.email}</td>
                                <td>{member.profile.previousMember?.toString()}</td>
                                <td>{member.profile.universityId}</td>
                                <td>{member.profile.yearOfStudy?.toString()}</td>
                                <td>{member.profile.gender?.toString()}</td>
                                <td>{member.profile.ethnicity}</td>
                                <td>{member.profile.currentStudy}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Button onClick={submitMembers}>Populate Database</Button>
        </div>
    );
};
