export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

// strict typing
export type Exact<T> = T extends infer U
    ? { [K in keyof U]: U[K] } & Record<Exclude<keyof T, keyof U>, never>
    : never;
