import { env } from "@libs/env";

const message = `\x1b[33;1m
==============================
🚨 ROUTE BYPASS IS ENABLED 🚨
==============================
\x1b[33;4mThings may not be working as expected, 
please use with caution.\x1b[0m
`;

// toggle by changing env variable
// add to .env
// ROUTE_PROTECTION_BYPASS="enabled"

export const isBypassingRouteProtection = () => {
    const isBypass = env.ROUTE_PROTECTION_BYPASS === "enabled";

    if (isBypass) {
        console.log(message);
        console.log(__dirname);
        console.log();
    }

    return isBypass;
};
