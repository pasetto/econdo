import { User } from '../interfaces/user.interface';
import { Mail } from './mail.service';
import axios from 'axios';

export default class UserNotificationService {
    private mailService = new Mail();
    constructor() {
    }

    async sendMail(email: string, subject: string, message: string) {
        // Send email
		this.mailService.to = email;
        this.mailService.subject = process.env.MAIL_SUBJECT_PREFIX + subject;
        this.mailService.message = message;
        this.mailService.sendMail();
    }

    async sendWhatsapp(phone: string, subject: string, message: string) {
        // Send whatsapp message
        const webhook = process.env.WPP_WEBHOOK || '';
        // remove third character from phone number
        const data = {
            to: phone.substring(0, 2) + phone.substring(3),
            subject: subject,
            message: message.replace(/<br>/g, '\n')
        }
        axios.post(webhook, data);
    }

    async sendMailNotification(user: User, subject: string, message: string) {
        this.sendMail(user.email, subject, message);
    }

    async sendWhatsappNotification(user: User, subject: string, message: string) {
        this.sendWhatsapp(user.phone, subject,  message);
    }

    async sendNotification(user, subject: string, message: string) {
        this.sendMail(user.email, subject, message);
        this.sendWhatsapp(user.phone, subject, message);
    }

}