import z, { string } from "zod";

const registerSchema = z
  .object({
    fname: z.string().trim().nonempty({ message: "First name is required!" }),
    lname: z.string().trim().nonempty({ message: "Last name is required!" }),
    birthdate: z.string().nonempty({ message: "Birthdate is required!" }),
    email: z
      .string()
      .trim()
      .email()
      .nonempty({ message: "Email is required!" }),
    password: z
      .string()
      .trim()
      .min(6)
      .max(16)
      .nonempty({ message: "Password is required!" }),
    confirm_password: z
      .string()
      .trim()
      .nonempty({ message: "Confirm password is required!" }),
    avatar: string().optional(),
  })
  .refine(
    ({ birthdate }) => {
      const date = new Date(birthdate);
      const isValidDate = !isNaN(date.getTime());

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return isValidDate && date <= today;
    },
    {
      message: "Invalid date!",
      path: ["birthdate"],
    }
  )
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
  .refine(
    ({ password, confirm_password }) =>
      !password || !confirm_password || password === confirm_password,
    {
      message: "Confirm password must match.",
      path: ["passwordValidation"],
    }
  );

export default registerSchema;
