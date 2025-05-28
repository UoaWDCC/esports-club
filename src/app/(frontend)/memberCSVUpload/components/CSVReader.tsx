"use client";

import React, { useState } from "react";
import { GendersOptions, ProfileDTOType, YearOfStudyOptions } from "@libs/db/types/profile";
import Button from "@ui/button/Button";
import Papa from "papaparse";

import { insertMember } from "@/services/profile/insertProfile";
import { validateProfile } from "@/services/profile/validateProfile";

import { parseProfile } from "../utils/parseProfile";

export const CSVReader = () => {
    const [csvData, setCSVData] = useState<ProfileDTOType[]>([]);
    const [malformedcsvData, setMalformedCSVData] = useState<ProfileDTOType[]>([]);

    const submitMembers = () => {
        csvData.map((member) => {
            insertMember(member);
        });
    };

    async function resultsParse(results: string[][]) {
        const tempMemberData: ProfileDTOType[] = [];
        const tempMalformedData: ProfileDTOType[] = [];
        await Promise.all(
            results.map(async (raw, index) => {
                // Input sanitation to avoid errors
                if (index == 0) return;

                const newProfile = parseProfile(raw);
                if (!newProfile) return;

                // Input sanitation ends and ask Server to Validate the profile
                const valid = await validateProfile(newProfile);
                if (valid.error) {
                    console.log("MALFORMED ROW:");
                    console.log(valid.details);
                    tempMalformedData.push(newProfile);
                }

                if (valid.success) {
                    tempMemberData.push(newProfile);
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

            <Button onClick={submitMembers}>Populate Database</Button>
        </div>
    );
};
