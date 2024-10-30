import nodemailer from "nodemailer";

const testMail = process.env.TEST_MAIL === "true" ? true : false;
const transporter = nodemailer.createTransport(
  testMail
    ? {
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "kaden.emmerich48@ethereal.email",
          pass: "z7mkYqBB5Cyhpsy39F",
        },
      }
    : {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 487,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: process.env.GOOGLE_MAILER_USER,
          pass: process.env.GOOGLE_MAILER_PASS,
        },
      }
);

export default transporter;
