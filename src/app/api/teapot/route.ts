import { response } from "@libs/api/response";
import { routeWrapper } from "@libs/api/wrappers";

import { TeaPotCommentResponse, TeaPotRouteResponse, ZTeaPotSaysRequest } from "./type";

// use "zod" not "zod/v4"

/**
 * ? i'm a teapot and i reply with a tea
 * ? i help give example
 *
 * * Teapot recommends using Postman to try out the tea API
 */

/********************
 * ? GET example
 ********************/

// simple GET, that returns a tea
// wrap the api and type the response
export const GET = routeWrapper<TeaPotRouteResponse>(() => {
    // build tea response
    const res: TeaPotRouteResponse = {
        tea: "Qimen Hongcha",
    };

    // return tea with the standardized response function
    return response("teapot", { data: res, message: "the greatest tea of all time" });
});

/********************
 * ? POST example
 ********************/

// simple POST, that judge your tea
// wrap the api and type the response
// POST is async doesn't need to be typed with Promise since the route wrapper handles with that
export const POST = routeWrapper<TeaPotCommentResponse>(async (req) => {
    const body = await req.json();
    // get tea object from body
    // validate the tea body
    const { data, error } = ZTeaPotSaysRequest.safeParse(body);

    // check is request body is valid
    if (error || !data) {
        return response("bad_request", {
            error: error?.issues,
            message: "teapot does not understand your tea, try Qimen Hongcha",
        });
    }

    // response according to tea
    let comment: string;
    let message: string;

    // check tea
    if (data.tea.toLowerCase() === "qimen hongcha") {
        comment = "good choice.";
        message = "I like Qimen Hongcha :D";
    } else {
        comment = "unique!";
        message = "you should try Qimen Hongcha";
    }

    // build response
    const res: TeaPotCommentResponse = {
        comment: comment,
    };

    // return a comments of your tea with the standardized response function
    return response("teapot", { data: res, message });
});
