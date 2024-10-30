import { Html, Button, Heading, Container } from "@react-email/components";
import React, { ReactNode } from "react";

const MailWrapper = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  return (
    <Html lang="en" dir="ltr">
      <Container
        style={{
          padding: "10px 12px",
          maxWidth: "600px",
          margin: "0 auto",
          borderLeft: "2px solid green",
          borderRight: "2px solid green",
        }}
      >
        <Heading
          style={{
            fontSize: "35px",
            padding: "5px 0",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            color: "teal",
            textShadow: "1px 1px black",
          }}
        >
          Note Explorer
        </Heading>
        {children}
      </Container>
    </Html>
  );
};

export default MailWrapper;
