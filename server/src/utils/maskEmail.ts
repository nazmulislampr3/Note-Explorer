const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.length <= 3
      ? localPart.replace(/./g, "*")
      : localPart.slice(0, 3) + localPart.slice(3).replace(/./g, "*");

  return `${maskedLocalPart}@${domain}`;
};

export default maskEmail;
