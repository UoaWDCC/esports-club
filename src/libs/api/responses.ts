import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

import {
    errorsStatuses,
    ErrorStatuses,
    standardApiResponse,
    successfulStatues,
    SuccessStatuses,
} from "./statuses";

// API response stanard base out of JSend
// https://github.com/omniti-labs/jsend

// thoughts:
// bit weird atm might refactor in the future

type DetailType<T extends string = string> =
    | {
          [key in T]: string | string[];
      }
    | ZodIssue[];

interface ApiResponse<T = { [key: string]: unknown }> {
    status: SuccessStatuses;
    data: T;
}
interface ApiErrorResponse {
    status: ErrorStatuses;
    message: string;
    details: DetailType;
}

type AnyApiResponse = ApiResponse | ApiErrorResponse;

// standard success api response with
// - stastus: 200-299
// - data: anything
const ApiResponse = <T>(status: SuccessStatuses, data: T) =>
    NextResponse.json(
        {
            status: status,
            data: data,
        } as ApiResponse<T>,
        {
            status: successfulStatues[status],
        },
    );

// standard error api response with
// - stastus: 400-599
// - data: anything
const ApiErrorResponse = (
    status: ErrorStatuses,
    message: string | null = "",
    details: DetailType = {},
) =>
    NextResponse.json(
        {
            status: status,
            message: message || standardApiResponse[status],
            details,
        } as ApiErrorResponse,
        {
            status: errorsStatuses[status],
        },
    );

export { ApiResponse, ApiErrorResponse };
export type { SuccessStatuses, AnyApiResponse };
