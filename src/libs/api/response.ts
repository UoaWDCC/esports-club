import { NextResponse } from "next/server";
import { Exact } from "@libs/types/utils";
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

export type Statuses = keyof typeof statuses;

const successes = ["ok", "created", "no_content"] as const;

type Successes = Extract<Statuses, (typeof successes)[number]>;
type Specials = Extract<Statuses, "teapot">;
type Errors = Exclude<Statuses, Successes | Specials>;

export type ApiResponse<T extends object = object> =
    | { status: Successes | Specials; data: T; message: string; error?: never }
    | { status: Errors; data?: never; message: string; error?: DetailType };

export type Response<T extends object = object> = NextResponse<ApiResponse<T>>;

type DetailType<T extends string = string> =
    | {
          [key in T]: string | string[] | undefined;
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

export function serverResponse<T extends object>(
    status: Statuses,
    body: { data?: Exact<T>; message?: string; error?: DetailType } = {},
): ApiResponse<T> {
    return {
        status,
        data: body.data,
        message: body.message || messages[status],
        error: body.error,
    } as ApiResponse<T>;
}

export function toResponse<T extends object>(result: ApiResponse<T>): Response<T> {
    return NextResponse.json(
        {
            status: result.status,
            data: result.data,
            message: result.message,
            error: result.error,
        },
        {
            status: statuses[result.status],
        },
    ) as Response<T>;
}

export const isOk = async (response: ApiResponse) => {
    return successes.some((status) => status === response.status);
};

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
