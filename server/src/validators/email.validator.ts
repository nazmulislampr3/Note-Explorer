import { z } from "zod";

const emailValidator = z
  .string()
  .email({ message: "Invalid email!" })
  .nonempty({ message: "Email is required!" });

export default emailValidator;
