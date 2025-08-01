import type { NextRequest } from "next/server";
import { AuthSession, getSession } from "@libs/auth/auth";
import { z } from "zod";

import { Response, response } from "./response";

// Credits to David Zhu

type EndpointOptions = {
    protected?: boolean;
    staff?: boolean;
};

export type RouteContext<P extends string = string> = {
    params: Promise<{
        [key in P]: string;
    }>;
};

type Handler<TReq extends object> = (
    req: NextRequest,
    session: AuthSession,
    context: RouteContext,
) => Response<TReq> | Promise<Response<TReq>>;

const defaultEndpointOptions = { protected: false, admin: false };

// this is a wrapper for nextjs api routes
// https://nextjs.org/docs/app/api-reference/file-conventions/route
// fetches the session of the user and deals with automatically authenticating protected and staff api routes
// exposes the session to the handler to be used

export function routeWrapper<TReq extends object>(
    handler: Handler<TReq>,
    options: EndpointOptions = defaultEndpointOptions,
) {
    // 1. get session
    // 2. compare permission required
    // 3. authenticate user
    // 4. return response from handler
    return async (req: NextRequest, context: RouteContext) => {
        try {
            const session = await getSession(req);

            if (!session && (options.protected || options.staff)) {
                return response("unauthorized");
            }

            if (options.staff && session?.user.role !== "staff") {
                return response("forbidden");
            }

            return await handler(req, session, context);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return response("bad_request", { message: error.message, error: error.issues });
            }

            if (error instanceof Error) {
                return response("internal_server_error", {
                    message: error.message,
                    error: {
                        name: error.name,
                        stack:
                            process.env.NODE_ENV === "development" ? error.stack || "" : undefined,
                    },
                });
            }

            return response("internal_server_error", { message: "unhandled server exception(s)" });
        }
    };
}

export function userRouteWrapper<TReq extends object>(handler: Handler<TReq>) {
    return routeWrapper((req, session, context) => handler(req, session, context), {
        protected: true,
    });
}

export function staffRouteWrapper<TReq extends object>(handler: Handler<TReq>) {
    return routeWrapper((req, session, context) => handler(req, session, context), {
        staff: true,
    });
}
