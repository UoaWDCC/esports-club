import "server-only";

import { env } from "@libs/env";
import Mail from "nodemailer/lib/mailer";

// standard smtp mail option for sending emails
// toggle ENVIRONMENT to "development" to send emails to your test email
export const standardMailOption = (body: Mail.Options) => {
    const isProduction = env.ENVIRONMENT !== "development";
    const endUserAddress = isProduction ? body.to : env.TEST_EMAIL || "";

    return {
        ...body,
        from: {
            name: "Esports",
            address: env.MAIL_USER,
        },
        to: endUserAddress,
    } as Mail.Options;
};
