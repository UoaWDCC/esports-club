import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

// API response stanard base out of JSend
// https://github.com/omniti-labs/jsend

const statuses = {
    // successful
    ok: 200,
    created: 201,
    no_content: 204,
    // errors
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    conflict: 409,
    teapot: 418,
    internal_server_error: 500,
    not_implemented: 501,
    // gateway timeout
    gateway_timeout: 504,
} as const;

const messages: Record<Statuses, string> = {
    ok: "The request was successful.",
    created: "The resource was successfully created.",
    no_content: "The content was successfully deleted.",
    bad_request: "The server could not understand the request sent.",
    unauthorized: "You are not authorized to access this resource",
    forbidden:
        "You are forbidden from accessing this resource. Please contact the admin if you think this is a mistake",
    not_found: "The requested resource could not be found.",
    conflict: "Conflict",
    teapot: "I'm a teapot",
    internal_server_error: "Something went wrong.",
    not_implemented: "This endpoint is not implemented yet.",
    gateway_timeout: "The server timed out while fulfilling the request.",
};

// strict typing
type Exact<T> = T extends infer U
    ? { [K in keyof U]: U[K] } & Record<Exclude<keyof T, keyof U>, never>
    : never;

export type Statuses = keyof typeof statuses;

type Successes = Extract<Statuses, "ok" | "created" | "no_content">;
type Specials = Extract<Statuses, "teapot">;
type Errors = Exclude<Statuses, Successes | Specials>;

export type Responses = keyof typeof response;
export type Response<T extends object = object> = NextResponse<
    | { status: Successes | Specials; data: T; message: string; error?: never }
    | { status: Errors; data?: never; message: string; error?: DetailType }
>;

type DetailType<T extends string = string> =
    | {
          [key in T]: string | string[];
      }
    | Array<ZodIssue>;

// ? Success statuses: must include data
// ? exclude error from success responses

export function response<T extends object>(
    status: Successes | Specials,
    body?: { data?: Exact<T>; message?: string; error?: never },
): Response<T>;

// ? Error statuses: must be empty
// ? exclude data from error responses
export function response<T extends object>(
    status: Errors,
    body?: { data?: never; message?: string; error?: DetailType },
): Response<T>;

/**
 * see documentation at `docs/backend.md`
 *
 * @param status { Successes | Errors }
 * @param body { data?: Exact<T>; message?: string; error?: DetailType }
 * @returns
 *
 *  @description this is an api response type that will ensure consistent api responses as well as zod error handling when doing integration testing
 *
 *  200 - 299: success response must include data unless Response type is empty
 *  everything else:  error response may include message and error details for zod state management
 */
export function response<T extends object>(
    status: Statuses,
    body: { data?: Exact<T>; message?: string; error?: DetailType } = {},
): Response<T> {
    return NextResponse.json(
        {
            status,
            data: body.data,
            message: body.message || messages[status],
            error: body.error,
        },
        {
            status: statuses[status],
        },
    ) as Response<T>;
}

/* examples
export const GET = (): Response<GetData> => { 
    
    success response 200 - 299

    ✅ response("created");
    ✅ response("ok", { message: "profile update" });
    ✅ response("ok", { data: { id: "1" } });
    
    ❌ response("ok", { data: { a: "2" } }); // ? data type is incorrect to the function signature
    ❌ response("ok", { error: { password: "not enough characters" } });
    
    other responses
    
    ✅ response("unauthorized");
    ✅ response("unauthorized", { message: "not a staff member" });
    ✅ response("unauthorized", { error: { password: "not enough characters" } });

    ❌ response("unauthorized", { data: { id: "2" } });
};
*/
