import { Schema } from "mongoose";

const imageSchema = new Schema({
  url: {
    required: true,
  },
  public_id: String,
});

export default imageSchema;
