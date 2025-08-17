import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ZodSchema } from "zod";

export const useCookieObject = <T extends object>(
    _default: T,
    schema: ZodSchema,
): [T, Dispatch<SetStateAction<T>>] => {
    const setter = () => {};

    return [theme, setter];
};
