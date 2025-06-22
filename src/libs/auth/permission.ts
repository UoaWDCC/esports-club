import { createAccessControl } from "better-auth/plugins/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 * contains resource name and keys
 */

// TODO: update permission according to future features
const statement = {
    project: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const member = ac.newRole({
    project: ["create"],
});

export const staff = ac.newRole({
    project: ["create", "update"],
});

export const admin = ac.newRole({
    project: ["create", "update", "delete"],
});
