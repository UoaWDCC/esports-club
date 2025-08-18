/**
 * Utility functions for handling event slugs
 */

/**
 * Converts an event title to a URL-friendly slug
 * @param title - The event title to convert
 * @returns A URL-friendly slug
 */
export function titleToSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .trim();
}

/**
 * Converts a slug back to a searchable format
 * @param slug - The slug to convert back
 * @returns A format that can be used to search for the original title
 */
export function slugToTitle(slug: string): string {
    return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
