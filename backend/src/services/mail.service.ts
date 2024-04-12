import * as nodemailer from "nodemailer";
import mailConfig from '../config/mailer';

export class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    sendMail() {

        const mailOptions = {
            from: `${mailConfig.name} <${mailConfig.user}>`,
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        console.log(mailOptions);
        console.log({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: true,
            auth: {
                user: mailConfig.user,
                pass: mailConfig.password
            },
            tls: { rejectUnauthorized: false }
        });

        const transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: true,
            auth: {
                user: mailConfig.user,
                pass: mailConfig.password
            },
            tls: { rejectUnauthorized: false }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return false;
            } else {
                return true;
            }
        });
    }


}