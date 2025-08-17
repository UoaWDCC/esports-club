import { env } from "@libs/env";
import { transporter } from "@libs/smtp/transporter";
import { render } from "@react-email/components";

import { EsportsMembershipRejectedEmail } from "@/components/email/email-reject-membership";

import { standardMailOption } from "../../libs/email/mail";

type EmailRejection = {
    to: string;
    subject: string;
    name: string;
    reason: string;
};

export const sendRejectionEmail = async (body: EmailRejection) => {
    // enable this to send mail
    if (env.NEXT_PUBLIC_ENABLE_MAILING !== "enabled") return;

    const emailHtml = await render(
        <EsportsMembershipRejectedEmail name={body.name} reason={body.reason} />,
    );

    const mailOptions = standardMailOption({
        to: body.to,
        subject: body.subject,
        html: emailHtml,
    });
    console.log(body.to);
    console.log(mailOptions);
    return await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
