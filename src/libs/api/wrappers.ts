import type { NextRequest } from "next/server";
import { auth } from "@libs/auth/auth";
import { Session } from "next-auth";
import { z } from "zod";

import { ApiErrorResponse } from "./responses";

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

type Handler = (
    req: NextRequest,
    session: Session | null,
    context: RouteContext,
) => Response | Promise<Response>;

type UserRouteHandler = (
    req: NextRequest,
    user: Session | null,
    context: RouteContext,
) => Response | Promise<Response>;

const defaultEndpointOptions = { protected: false, admin: false };

export function routeWrapper(handler: Handler, options: EndpointOptions = defaultEndpointOptions) {
    return async (req: NextRequest, context: RouteContext) => {
        try {
            const session = await auth();

            if (!session && (options.protected || options.staff)) {
                return ApiErrorResponse("unauthorized");
            }

            if (options.staff && session?.user.role !== "staff") {
                return ApiErrorResponse("forbidden");
            }

            return await handler(req, session, context);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return ApiErrorResponse("bad_request", error.message, error.issues);
            }

            return ApiErrorResponse("internal_server_error");
        }
    };
}

export function userRouteWrapper(handler: UserRouteHandler) {
    return routeWrapper((req, user, context) => handler(req, user, context), {
        protected: true,
    });
}

export function staffRouteWrapper(handler: UserRouteHandler) {
    return routeWrapper((req, user, context) => handler(req, user, context), {
        staff: true,
    });
}
