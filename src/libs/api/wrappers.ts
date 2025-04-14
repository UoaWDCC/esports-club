import { NextApiResponse } from "next";
import type { NextRequest } from "next/server";
import { Session } from "next-auth";
import { z } from "zod";

import { auth } from "@/auth";

import { responses } from "./responses";

// Credits to David Zhu

type EndpointOptions = {
    protected?: boolean;
    staff?: boolean;
};

type Handler = (
    req: NextRequest,
    res: NextApiResponse,
    session?: Session,
) => void | Response | Promise<void | Response>;

type UserRouteHandler = (
    req: NextRequest,
    res: NextApiResponse,
    user: Session,
) => void | Response | Promise<void | Response>;

const defaultEndpointOptions = { protected: false, admin: false };

export function routeWrapper(handler: Handler, options: EndpointOptions = defaultEndpointOptions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (req: NextRequest, res: NextApiResponse) => {
        try {
            // check if request is authenticated
            const session = await auth();

            if (!session) return responses.unauthorized();

            if ((options.protected || options.staff) && !session) return responses.unauthorized();

            if (options.staff && session?.user.role !== "staff") return responses.forbidden();

            // return the route handler
            return await handler(req, res, session);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return responses.badRequest();
            }
            // catch all errors
            console.error("Error:", error);
            return responses.internalServerError();
        }
    };
}

export function userRouteWrapper(handler: UserRouteHandler) {
    return routeWrapper((req, res, user) => handler(req, res, user!), {
        protected: true,
    });
}

export function staffRouteWrapper(handler: UserRouteHandler) {
    return routeWrapper((req, res, user) => handler(req, res, user!), {
        staff: true,
    });
}
