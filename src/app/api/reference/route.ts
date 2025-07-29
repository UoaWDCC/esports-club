import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
    url: "/openapi.json",
};

export const GET = ApiReference(config);
