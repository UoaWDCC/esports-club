import { z } from "zod";

// * for GET

// export zod schema and type
export const ZTeapotRoute = z.object({
    tea: z.string(),
});
export type TeaPotRouteResponse = z.infer<typeof ZTeapotRoute>;

// * for POST

// export zod schema and type
export const ZTeaPotSaysRequest = z.object({
    tea: z.string(),
});
export type TeaPotSaysRequest = z.infer<typeof ZTeaPotSaysRequest>;

export type TeaPotCommentResponse = z.infer<typeof ZTeaPotSays>;

// export zod schema and type
export const ZTeaPotSays = z.object({
    comment: z.string(),
});
