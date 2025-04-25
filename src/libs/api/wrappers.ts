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

type Handler = (req: NextRequest, session?: Session) => Response | Promise<Response>;

type UserRouteHandler = (req: NextRequest, user: Session) => Response | Promise<Response>;

const defaultEndpointOptions = { protected: false, admin: false };

export function routeWrapper(handler: Handler, options: EndpointOptions = defaultEndpointOptions) {
    return async (req: NextRequest) => {
        try {
            const session = await auth();

            if (!session && (options.protected || options.staff)) {
                return responses.unauthorized();
            }

            if (options.staff && session?.user.role !== "staff") {
                return responses.forbidden();
            }

            return await handler(req, session!);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return responses.badRequest();
            }

            console.error("Error:", error);
            return responses.internalServerError();
        }
    };
}

export function userRouteWrapper(handler: UserRouteHandler) {
    return routeWrapper((req, user) => handler(req, user!), {
        protected: true,
    });
}

export function staffRouteWrapper(handler: UserRouteHandler) {
    return routeWrapper((req, user) => handler(req, user!), {
        staff: true,
    });
}
