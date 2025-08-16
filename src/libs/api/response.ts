import { NextResponse } from "next/server";
import { Exact } from "@libs/types/utils";
import { z, ZodIssue, ZodSchema } from "zod";

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

export type ServerResponse<T extends object = object> =
    | { status: Successes | Specials; data: T; message: string; error?: never }
    | { status: Errors; data?: never; message: string; error?: DetailType };

type Metadata = {
    status: Statuses;
    message: string;
    error: DetailType;
};

export type ApiResponse<T extends object = object> =
    | ({
          [K in keyof T]: T[K];
      } & {
          metadata: Metadata;
      })
    | Metadata;

// Response type for NextResponse with new structure
export type Response<T extends object = object> = NextResponse<ApiResponse<T>>;

type DetailType<T extends string = string> =
    | {
          [key in T]: string | string[] | undefined;
      }
    | Array<ZodIssue>;

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
    const metadata = {
        status,
        message: body.message || messages[status],
        error: body.error,
    };

    // For successful responses, return data with metadata
    if (successes.includes(status as Successes) || status === "teapot") {
        return NextResponse.json(
            { ...body.data, metadata },
            { status: statuses[status] },
        ) as Response<T>;
    }

    // For error responses, return only metadata
    return NextResponse.json({ metadata }, { status: statuses[status] }) as Response<T>;
}

// ? server action response

export function serverResponse<T extends object>(
    status: Statuses,
    body: { data?: Exact<T>; message?: string; error?: DetailType } = {},
): ServerResponse<T> {
    return {
        status,
        data: body.data,
        message: body.message || messages[status],
        error: body.error,
    } as ServerResponse<T>;
}

export function toResponse<T extends object>(result: ServerResponse<T>): Response<T> {
    const metadata = {
        status: result.status,
        message: result.message,
        error: result.error,
    };

    // For successful responses, return data with metadata
    if (successes.includes(result.status as Successes) || result.status === "teapot") {
        return NextResponse.json(
            { ...result.data, metadata },
            { status: statuses[result.status] },
        ) as Response<T>;
    }

    // For error responses, return only metadata
    return NextResponse.json({ metadata }, { status: statuses[result.status] }) as Response<T>;
}

export const isOk = (response: { status: Statuses }) => {
    return successes.some((status) => status === response.status);
};

export const parseQuery = async <T extends ZodSchema>(
    response: Response,
    schema: T,
): Promise<z.infer<typeof schema>> => {
    const data = (await response.json()) as ApiResponse<object>;

    if (!response.ok) {
        // error: Check if data has metadata property before accessing it
        const errorMessage = "metadata" in data ? data.metadata.message : "Something went wrong";
        throw new Error(errorMessage);
    }

    return schema.parse(data);
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

// New response structure:
// Success: { id: "1", metadata: { status: "ok", message: "The request was successful.", error: undefined } }
// Error: { metadata: { status: "unauthorized", message: "not a staff member", error: { password: "not enough characters" } } }
*/
