import { z } from "zod";

// * for GET

// export zod schema and type
export const ZTeapotIdRoute = z.object({
    tea: z.string(),
    id: z.string(),
});
export type TeaPotIdRouteResponse = z.infer<typeof ZTeapotIdRoute>;
