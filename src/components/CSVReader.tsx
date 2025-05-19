"use client";

import React, { useState } from "react";
import Papa from "papaparse";

interface memberData {
    firstName: string;
    lastName: string;
    email: string;
    universityId: number;
    previousMember: boolean;
    yearOfStudy: string;
    gender: string;
    ethnicity: string;
    currentStudy: string;
}

export const CSVReader = () => {
    const [csvData, setCSVData] = useState<memberData[]>([]);

    const resultsFormat = (results: string[][]) => {
        let tempMemberData: memberData[] = [];
        results.map((raw, index) => {
            if (index == 0) {
                return;
            }
            let fullName: string = raw[6];
            console.log(fullName);
            var firstName = fullName.split(" ").slice(0, -1).join(" ");
            var lastName = fullName.split(" ").slice(-1).join(" ");
            let prevMemRaw = raw[3];
            let previousMember = false;
            if (prevMemRaw == "Yes") {
                previousMember = true;
            }

            let newMember: memberData = {
                firstName: firstName,
                lastName: lastName,
                email: raw[7],
                universityId: Number(raw[8]),
                previousMember: previousMember,
                yearOfStudy: raw[12],
                gender: raw[10],
                ethnicity: raw[11],
                currentStudy: raw[13],
            };
            tempMemberData.push(newMember);
        });

        setCSVData(tempMemberData);
        console.log(tempMemberData);
        console.log(results);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        Papa.parse<string[]>(file, {
            header: false,
            dynamicTyping: true,
            complete: (results) => {
                resultsFormat(results.data);
            },
        });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
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
                                <td>{member.previousMember.toString()}</td>
                                <td>{member.universityId}</td>
                                <td>{member.yearOfStudy}</td>
                                <td>{member.gender}</td>
                                <td>{member.ethnicity}</td>
                                <td>{member.currentStudy}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

function resultsFormat(result: Papa.ParseResult<string[]>) {
    throw new Error("Function not implemented.");
}
