const successfulStatues = {
    ok: 200,
    created: 201,
    no_content: 204,
} as const;

const errorsStatuses = {
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    conflict: 409,
    internal_server_error: 500,
} as const;

const standardApiResponse: Record<AnyStatus, string> = {
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
};

type SuccessStatuses = keyof typeof successfulStatues;
type ErrorStatuses = keyof typeof errorsStatuses;
type AnyStatus = SuccessStatuses | ErrorStatuses;

type ErrorStatusCode = (typeof errorsStatuses)[ErrorStatuses];
type SuccessStatusCode = (typeof successfulStatues)[SuccessStatuses];
type AnyStatusCode = SuccessStatusCode | ErrorStatusCode;

export { successfulStatues, errorsStatuses, standardApiResponse };
export type {
    SuccessStatusCode,
    SuccessStatuses,
    ErrorStatuses,
    ErrorStatusCode,
    AnyStatus,
    AnyStatusCode,
};
