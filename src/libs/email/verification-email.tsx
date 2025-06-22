import { env } from "@libs/env";
import { transporter } from "@libs/smtp/transporter";
import { render } from "@react-email/components";
import Mail from "nodemailer/lib/mailer";

import { EsportsLinkVerification } from "@/components/email/email-verification";

type EmailVerification = {
    to: string;
    subject: string;
    url: string;
};

export const sendVerificationEmail = async (body: EmailVerification) => {
    const emailHtml = await render(<EsportsLinkVerification url={body.url} />);

    const mailOptions = {
        from: {
            name: "Esports",
            address: env.MAIL_USER,
        },
        // TODO: change to actual email
        // to: body.to,
        to: "esports@projects.wdcc.co.nz",
        subject: body.subject,
        html: emailHtml,
    } as Mail.Options;

    return await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
