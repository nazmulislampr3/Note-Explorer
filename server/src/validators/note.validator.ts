import { z } from "zod";

const noteSchema = z.object({
  title: z.string().trim().optional(),
  desc: z.string().trim().optional(),
  theme: z.string().trim().optional(),
});

export default noteSchema;
