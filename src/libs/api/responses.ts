import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

// Credits to David Zhu

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

interface ApiSuccessResponse<T = { [key: string]: unknown }> {
    data: T;
}

type DetailType =
    | {
          [key: string]: string | string[];
      }
    | ZodIssue[];

interface ApiErrorResponse {
    code: string;
    message: string;
    details: DetailType;
}

const unauthorized = () =>
    NextResponse.json(
        {
            code: "UNAUTHORIZED",
            message: "You are not authorized to access this resource",
        } as ApiErrorResponse,
        {
            status: 401,
        },
    );

const forbidden = () =>
    NextResponse.json(
        {
            code: "FORBIDDEN",
            message:
                "You are forbidden from accessing this resource. Please contact the admin if you think this is a mistake",
        } as ApiErrorResponse,
        {
            status: 403,
        },
    );

const badRequest = () =>
    NextResponse.json(
        {
            code: "BAD_REQUEST",
            message: "The server could not understand the request sent.",
        } as ApiErrorResponse,
        {
            status: 403,
        },
    );

const internalServerError = () =>
    NextResponse.json(
        {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong.",
        } as ApiErrorResponse,
        {
            status: 403,
        },
    );

export const responses = {
    unauthorized,
    forbidden,
    badRequest,
    internalServerError,
};
