import { env } from "@libs/env";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: parseInt(env.MAIL_PORT),
    secure: process.env.NODE_ENV !== "development",
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
    },
});
