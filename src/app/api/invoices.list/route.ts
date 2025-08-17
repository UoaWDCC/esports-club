//FOR THE USER!!!!!!
import { response } from "@libs/api/response";
import { userRouteWrapper } from "@libs/api/wrappers";
import { db } from "@libs/db";
import { invoices } from "@libs/db/schema/invoices";
import { ZInvoiceDTO } from "@libs/types/invoice.type";
import { profiles } from "@schema";
import { eq } from "drizzle-orm";

import { InvoiceListResponse } from "./type";

export const GET = userRouteWrapper<InvoiceListResponse>(async (_, session) => {
    const { id: userId } = session.user;

    const userProfile = await db.query.profiles.findFirst({
        where: eq(profiles.userId, userId),
    });

    if (!userProfile) {
        return response("unauthorized", {
            message: "You do not have a profile",
        });
    }

    const { id: profileId } = userProfile;

    const allUserInvoices = await db.query.invoices.findMany({
        where: eq(invoices.profileId, profileId),
    }); // array of invoices raw form

    console.log(allUserInvoices);

    const { data, success, error } = ZInvoiceDTO.array().safeParse(allUserInvoices);

    if (!success) {
        return response("internal_server_error", {
            message: "Something went wrong, please contact the admin",
            error: error.issues,
        });
    }

    return response("ok", { data: { invoices: data } });
});
