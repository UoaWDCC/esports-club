import type { CollectionConfig } from "payload";

export const UsersCollection: CollectionConfig = {
    slug: "users",
    admin: {
        useAsTitle: "email",
    },
    auth: true,
    fields: [
        // Email added by default
        // Add more fields as needed
    ],
};
