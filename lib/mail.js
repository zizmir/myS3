import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class Mailer {
  constructor() {
    if (!Mailer.instance) {
      Mailer.instance = this;
      this.initialize();
    }
    return Mailer.instance;
  }

  initialize() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false, // true for 465, false for other ports

    });
  }

  send(to, subject, text, html) {
    const mailOptions = {
      from: 'Admin 👻 <admin@express-island.com>', // sender address
      to,
      subject,
      text,
      html,
    };
    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  }
}

const instance = new Mailer();
export default instance;
