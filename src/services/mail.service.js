import nodemailer from 'nodemailer'
import { configs } from '../config.js';

const transporter =  nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user: configs.gmailUser ,
        pass: configs.gmailPassword
    }
})

const sendEmail = async (email) => {
    await transporter.sendMail({
        from:'CoderHouse 55575',
        to:email.to,
        subject:email.subject,
        html: email.html
    });
}  

export default sendEmail