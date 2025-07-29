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
type Errors = Exclude<Statuses, Successes>;

export type Responses = keyof typeof response;
export type Response<T extends {}> = NextResponse<
    | { status: Successes; data: T; message: string; error?: DetailType }
    | { status: Errors; message: string; error?: DetailType }
>;

type DetailType<T extends string = string> =
    | {
          [key in T]: string | string[];
      }
    | ZodIssue[];

// ? Success statuses: must include data

export function response<T extends object>(
    status: Successes,
    body: { data?: Exact<T>; message?: string; error?: DetailType },
): Response<T>;

// ? Error statuses: must be empty

export function response<T extends object>(
    status: Errors,
    body?: { data?: never; message?: string; error?: DetailType },
): Response<T>;

export function response<T extends object = object>(
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
