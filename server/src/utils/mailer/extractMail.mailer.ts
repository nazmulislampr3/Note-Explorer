import { render } from "@react-email/components";

const extractMail = async (Element: React.ReactElement): Promise<string> => {
  const htmlText = await render(Element);
  return htmlText;
};
export default extractMail;
