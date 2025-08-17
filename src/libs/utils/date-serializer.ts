/**
 * Utility to ensure consistent date handling in API responses
 */

export type DateFields = Record<string, unknown>;

/**
 * Converts string date fields to Date objects
 * Useful for API responses where dates come as strings
 */
export function parseDates<T extends DateFields>(obj: T): T {
    const result = { ...obj } as Record<string, unknown>;

    // Common date field names in your schema
    const dateFields = ["createdAt", "updatedAt", "updateAt", "startAt", "endAt"];

    dateFields.forEach((field) => {
        if (result[field] && typeof result[field] === "string") {
            result[field] = new Date(result[field] as string);
        }
    });

    return result as T;
}

/**
 * Parse dates for an array of objects
 */
export function parseDatesArray<T extends DateFields>(arr: T[]): T[] {
    return arr.map(parseDates);
}

/**
 * Serialize dates to strings for API transmission
 * (Usually handled automatically by JSON.stringify, but useful for explicit control)
 */
export function serializeDates<T extends DateFields>(obj: T): T {
    const result = { ...obj } as Record<string, unknown>;

    const dateFields = ["createdAt", "updatedAt", "updateAt", "startAt", "endAt"];

    dateFields.forEach((field) => {
        if (result[field] instanceof Date) {
            result[field] = (result[field] as Date).toISOString();
        }
    });

    return result as T;
}
