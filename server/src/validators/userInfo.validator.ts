import { z } from "zod";

const userInfoSchema = z
  .object({
    fname: z
      .string()
      .trim()
      .nonempty({ message: "First name is required!" })
      .optional(),
    lname: z
      .string()
      .trim()
      .nonempty({ message: "Last name is required!" })
      .optional(),
    // birthdate: z.date().optional(),
    password: z
      .string()
      .trim()
      .nonempty({ message: "Password required to update user details.!" }),
  })
  .refine(
    ({ fname, lname, password }) => {
      return [fname, lname, password].every((item) => !!item);
    },
    { message: "Fill all required fields.", path: ["globalMessage"] }
  );

export default userInfoSchema;
