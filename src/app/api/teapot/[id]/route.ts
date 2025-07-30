import { response } from "@libs/api/response";
import { RouteContext, routeWrapper } from "@libs/api/wrappers";

import { TeaPotIdRouteResponse } from "./type";

/********************
 * ? GET example
 ********************/

// simple GET, that returns a tea with "id"
// wrap the api and type the response
// type your param with RouteContext<"param_name">
export const GET = routeWrapper<TeaPotIdRouteResponse>(
    async (req, session, ctx: RouteContext<"id">) => {
        // ctx param is a promise so you need to await
        const { id } = await ctx.params;

        if (!id) {
            return response("bad_request", { message: "id is required" });
        }

        // build tea response
        const res: TeaPotIdRouteResponse = {
            tea: "Qimen Hongcha",
            id: id,
        };

        // return tea with the standardized response function
        return response("teapot", { data: res, message: "the greatest tea of all time" });
    },
);
