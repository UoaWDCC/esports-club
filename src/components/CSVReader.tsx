"use client";

import React, { useState } from "react";
import Button from "@ui/button/Button";
import Papa from "papaparse";

import { profileInsertData, validateProfile } from "@/services/profile/validateProfile";

import { insertMember } from "../services/profile/insertProfile";

export const CSVReader = () => {
    const [csvData, setCSVData] = useState<profileInsertData[]>([]);
    const [malformedcsvData, setMalformedCSVData] = useState<profileInsertData[]>([]);

    const submitMembers = () => {
        csvData.map((member) => {
            insertMember(member);
        });
    };

    async function resultsParse(results: string[][]) {
        const tempMemberData: profileInsertData[] = [];
        const tempMalformedData: profileInsertData[] = [];
        await Promise.all(
            results.map(async (raw, index) => {
                // Input sanitation to avoid errors
                if (index == 0) {
                    return;
                }

                const fullName: string = raw[6];
                if (fullName == null) {
                    return;
                }

                const firstName = fullName.split(" ").slice(0, -1).join(" ");
                const lastName = fullName.split(" ").slice(-1).join(" ");

                const prevMemRaw = raw[3];
                let previousMember = false;
                if (prevMemRaw == "Yes") {
                    previousMember = true;
                }

                const yearOfStudy = raw[12] as
                    | "First year"
                    | "Second year"
                    | "Third year"
                    | "Fourth year"
                    | "Fifth year"
                    | "Postgraduate"
                    | "Graduated"
                    | "Not at university";

                const gender = raw[10]?.toLowerCase() as
                    | "male"
                    | "female"
                    | "non_binary"
                    | "genderfluid"
                    | "other";

                const newMember: profileInsertData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: raw[7],
                    universityId: String(raw[8]),
                    previousMember: previousMember,
                    yearOfStudy: yearOfStudy,
                    gender: gender,
                    ethnicity: raw[11],
                    currentStudy: raw[13],
                };
                // Input sanitation ends and ask Server to Validate the profile
                const valid = await validateProfile(newMember);
                if (valid.error) {
                    console.log("MALFORMED ROW:");
                    console.log(valid.details);
                    tempMalformedData.push(newMember);
                }

                if (valid.success) {
                    tempMemberData.push(newMember);
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
