import React from "react";

export const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
            errorData?.message || `${response.status} Error: ${response.statusText}`;

        throw new Error(errorMessage);
    }

    return response.json();
};
