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

export default (
  managerEmail: string,
  postitionTitle: string,
  firstName: string,
  lastName: string,
  candidateEmail: string,
  jobId: string
) => {
  const mailOptions: SendMailOptions = {
    to: managerEmail,
    subject: `From UKG: A New Referral Has Been Created!`,
    html: `
      <h3>Position</h3>
      <p>${postitionTitle}</p>
      <h3>Candidate Name</h3>
      <p>${firstName}${" "}${lastName}</p>
      <h3>Candidate Email</h3>
      <p>${candidateEmail}</p>
      <a href = "http://localhost:3000/jobs/${jobId}"><h2>Click Here For More Detail</h2></a>
    `,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
