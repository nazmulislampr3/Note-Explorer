import { z } from "zod";

const loginSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email!" })
      .nonempty({ message: "Email is required!" }),
    password: z.string().nonempty({ message: "Password is required!" }),
  })
  .refine(
    ({ email, password }) => [email, password].every((input) => !!input),
    { message: "Fill all required fields!", path: ["globalMessage"] }
  );

export default loginSchema;
