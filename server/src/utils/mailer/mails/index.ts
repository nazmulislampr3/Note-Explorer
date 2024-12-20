import extractMail from "./../extractMail.mailer";
import OTPMail from "./OTPMail";

export const registerOTPMail = async ({
  otp,
  reciever,
}: {
  otp: string;
  reciever: string;
}): Promise<string> =>
  await extractMail(
    OTPMail({
      otp,
      reciever,
      textWithOTP: "Your account verification otp is",
      headerText: `Hi ${reciever}, welcome to our application.`,
    })
  );

export const accountRecoverOTPMail = async ({
  otp,
  reciever,
}: {
  otp: string;
  reciever: string;
}): Promise<string> =>
  await extractMail(
    OTPMail({
      otp,
      reciever,
      textWithOTP: "Your account recovery otp is",
    })
  );
