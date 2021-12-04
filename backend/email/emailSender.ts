// Source: https://mailtrap.io/blog/nodemailer-gmail/
// If not working, unlock captcha and try again: https://accounts.google.com/b/0/displayunlockcaptcha

import nodemailer from "nodemailer";
import { SendMailOptions, Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "UKG.No.Reply@gmail.com",
    pass: "kronos1234",
  },
});

export default (managerEmail: string) => {
  const mailOptions: SendMailOptions = {
    to: managerEmail,
    subject: `from UKG: The subject goes here`,
    text: "a new Referral has been created!",
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
