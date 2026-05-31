import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"KYC Team" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default {
  sendMail,
};
