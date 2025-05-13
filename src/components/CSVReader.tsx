"use client";

import React, { useState } from "react";
import Papa from "papaparse";

interface UserData {
    name: string;
}

export const CSVReader = () => {
    const [csvData, setCsvData] = useState<UserData[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        Papa.parse<UserData>(file, {
            header: true,
            complete: (results) => {
                setCsvData(results.data);
                console.log(results.data);
            },
        });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <table>
                <tbody>
                    <tr>
                        <th> Name </th>
                    </tr>

                    {csvData.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
