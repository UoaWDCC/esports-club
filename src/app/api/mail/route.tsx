import { env } from "@libs/env";
import { transporter } from "@libs/smtp/transporter";
import { render } from "@react-email/components";
import Mail from "nodemailer/lib/mailer";

import { EsportsLoginCodeEmail } from "@/components/email/email-code";

type SendEmailDTO = {
    sender: Mail.Address;
    receipients: Mail.Address[];
    subject: string;
    text: string;
};

const sendEmail = async (sendEmail: SendEmailDTO) => {
    const emailHtml = await render(<EsportsLoginCodeEmail validationCode="123456" />);

    const mailOptions = {
        from: sendEmail.sender,
        to: sendEmail.receipients,
        subject: sendEmail.subject,
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

export async function GET() {
    const sendEmailData = {
        sender: {
            name: "Esports",
            address: env.MAIL_USER,
        },
        receipients: [
            {
                name: "Test",
                address: "esports@projects.wdcc.co.nz",
            },
        ],
        subject: "Test subject",
        text: "Test text",
    };

    await sendEmail(sendEmailData);
    return new Response("Email sent");
}
