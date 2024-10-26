import z, { string } from "zod";

const registerSchema = z
  .object({
    fname: z.string().nonempty({ message: "First name is required!" }),
    lname: z.string().nonempty({ message: "Last name is required!" }),
    birthdate: z.date(),
    email: z.string().email().nonempty({ message: "Email is required!" }),
    password: z
      .string()
      .min(6)
      .max(16)
      .nonempty({ message: "Password is required!" }),
    confirm_password: z
      .string()
      .nonempty({ message: "Confirm password is required!" }),
    avatar: string().optional(),
  })
  .refine(
    ({ fname, birthdate, lname, email, password, confirm_password }) => {
      return [fname, birthdate, lname, email, password, confirm_password].every(
        (input) => !!input
      );
    },
    {
      message: "Fill all required fields!",
      path: ["globalMessage"],
    }
  )
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Confirm password must match.",
    path: ["passwordValidation"],
  });

export default registerSchema;
