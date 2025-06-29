import { transporter } from "@libs/smtp/transporter";
import { render } from "@react-email/components";

import { EsportsLinkVerification } from "@/components/email/email-verification";

import { standardMailOption } from "./mail";

type EmailVerification = {
    to: string;
    subject: string;
    url: string;
};

export const sendVerificationEmail = async (body: EmailVerification) => {
    // email ui
    const emailHtml = await render(<EsportsLinkVerification url={body.url} />);

    const mailOptions = standardMailOption({
        to: body.to,
        subject: body.subject,
        html: emailHtml,
    });

    return await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
