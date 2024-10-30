import { Heading, Markdown, Text } from "@react-email/components";
import { ReactElement } from "react";
import MailWrapper from "./MailWrapper";

const OTPMail = ({
  otp,
  reciever,
  textWithOTP,
  headerText,
}: {
  otp: string;
  headerText?: string;
  textWithOTP: string;
  reciever: string;
}): ReactElement => {
  return (
    <MailWrapper>
      <Heading
        style={{
          fontSize: "20px",
        }}
      >
        {headerText ? headerText : `Hi ${reciever},`}
      </Heading>
      <Text
        style={{
          fontSize: "18px",
          display: "inline-block",
        }}
      >
        {textWithOTP} :{" "}
        <span
          style={{
            background: "#cccccc",
            fontWeight: "bold",
            padding: "3px 5px",
          }}
        >
          {otp}
        </span>
      </Text>
    </MailWrapper>
  );
};

export default OTPMail;
