import { transporter } from "@libs/smtp/transporter";
import { render } from "@react-email/components";

import { EsportsMembershipApprovedEmail } from "@/components/email/email-approve-membership";

import { standardMailOption } from "../../libs/email/mail";

type EmailApproval = {
    to: string;
    subject: string;
    name: string;
    invoiceID: string;
};

export const sendApprovalEmail = async (body: EmailApproval) => {
    const emailHtml = await render(
        <EsportsMembershipApprovedEmail name={body.name} invoiceID={body.invoiceID} />,
    );

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
