import transporter from "./transporter.mailer.js";

type MailOptions = {
  subject: string;
  to: string;
  html?: string;
  text?: string;
};
const sendMail = async ({
  subject,
  to,
  html = "<div>Test mail</div>",
  text = "",
}: MailOptions) => {
  await transporter.sendMail({
    from: `${process.env.APP_NAME} <${process.env.GOOGLE_MAILER_USER}>`,
    subject,
    to,
    html,
    text,
  });
};

export default sendMail;
