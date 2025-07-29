import { Response, response } from "@libs/api/response";
import { z } from "zod/v4";

const GetData = z.object({
    id: z.string(),
});

type GetData = z.infer<typeof GetData>;

export const GET = (): Response<GetData> => {
    // response("ok", { data: { id: "1" } });
    // response("ok", {});
    // response("ok");
    // response("unauthorized");
    // response("unauthorized", { data: { id: "2" } });
    // response("unauthorized", { error: { wtf: "wtf" } });

    return response("ok", { data: { id: "1" } });
};
