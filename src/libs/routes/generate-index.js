/* eslint-disable @typescript-eslint/no-require-imports */

const listRoutes = require("./list-route");
const fs = require("fs");
const path = require("path");

//
// generate next route into the index.ts
// node '.\src\libs\routes\generate-index.js'
//

console.log("------------------------------------------------------");
console.log("Generating routes...");
let routes = listRoutes();
const numberOfRoutes = routes.length;
console.log("Number of routes:", numberOfRoutes);

// order by priority
// lower number = higher priority
const METADATA = {
    TEST: { suffix: "/test/", priority: 0, order: 4 },
    AUTH: { suffix: "/auth/", priority: 1, order: 1 },
    PROTECTED: { suffix: "(protected)", priority: 3, order: 2 },
    STAFF: { suffix: "(staff)", priority: 2, order: 3 },
    PUBLIC: { suffix: "/", priority: 999, order: 0 },
};

// typescript typing
const routeType = `
// automatically generated with generate-index.js, 
// last generated: ${new Date().toLocaleDateString("en-NZ")}

export type RouteSection = {
    name: string;
    routes: Route[];
};

export type Route = { url: string; name: string };
`;

const routeGrouping = [];

const filterEntries = Object.entries(METADATA).sort((a, b) => a.priority - b.priority);
for (const [key, value] of filterEntries) {
    const namedRoutes = routes.filter((route) => route.url.includes(value.suffix));
    routes = routes.filter((route) => !route.url.includes(value.suffix));

    const name = `${key.charAt(0).toUpperCase()}${key.toLowerCase().slice(1)} Routes`;

    const namedRoutesGroupNormalised = namedRoutes.map((route) => {
        return {
            ...route,
            url: `${route.url}`
                .replace(/\((.*?)\)/g, "") // remove (group) segments
                .replace(/\/+/g, "/"), // normalize slashes
        };
    });

    routeGrouping.push({
        key,
        name,
        routes: namedRoutesGroupNormalised,
    });
}

const buildGroupString = (group) => {
    delete group.key;
    const groupName = group.name.toUpperCase().replaceAll(" ", "_");
    const stringifyGroup = JSON.stringify(group, null, 2);
    return `export const ${groupName}: RouteSection = ${stringifyGroup};`;
};

routeGrouping.sort((a, b) => METADATA[a.key].order - METADATA[b.key].order);
const exportedGroups = routeGrouping.map((group) => buildGroupString(group));

const indexContent = routeType + "\n" + exportedGroups.join("\n\n") + "\n";

fs.writeFileSync(path.join(__dirname, "index.generated.ts"), indexContent);
console.log("finished generating routes");
console.log("Saved to src/libs/routes/index.generated.ts");
console.log("------------------------------------------------------");
