import { model, Schema, Types } from "mongoose";
import cleanMongooseDocument from "../utils/cleanMongooseDocument";

const noteSchema = new Schema(
  {
    title: String,
    desc: String,
    theme: String,
    pinnedAt: Date,
    addedToFavouriteAt: Date,
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

noteSchema.pre("save", async function (next) {
  cleanMongooseDocument(this);
  next();
});

export const Note = model("Note", noteSchema);
