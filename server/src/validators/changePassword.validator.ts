import { z } from "zod";

const changePasswordSchema = z
  .object({
    old_password: z.string().nonempty({ message: "Old password is required!" }),
    password: z
      .string()
      .min(6, { message: "Password must have 6 to 16 characters." })
      .max(16, { message: "Password length must be maximum 16." }),
    confirm_password: z
      .string()
      .nonempty({ message: "Confirm password is required!" }),
  })
  .refine(
    ({ old_password, password, confirm_password }) =>
      [old_password, password, confirm_password].every((input) => !!input),
    {
      message: "Fill all the fields.",
      path: ["globalMessage"],
    }
  )
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password must match with confirm password!",
  });

export default changePasswordSchema;
