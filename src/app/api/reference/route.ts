import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
    url: "/openapi.yaml",
};

export const GET = ApiReference(config);
