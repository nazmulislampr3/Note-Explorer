import { PipelineStage, Types } from "mongoose";
import { Note } from "../models/note.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import organizeNotes from "../utils/organizeNotes.js";
import ApiError from "../utils/ApiError.js";

export const getNotes = asyncHandler(async (req, res) => {
  const { favourites, pinned } = req.query;

  const all = !favourites && !pinned;
  const targetFieldToExist = favourites
    ? "$addedToFavouriteAt"
    : pinned
    ? "$pinnedAt"
    : null;

  const sort: PipelineStage = {
    $sort: {
      pinnedAt: -1,
    },
  };
  if (favourites) {
    sort.$sort.addedToFavouriteAt = -1;
  }
  if (all) {
    sort.$sort.createdAt = -1;
  }

  const notes = await Note.aggregate(
    (
      [
        {
          $match: {
            user: new Types.ObjectId(req.user!.id as string),
            $expr: !all
              ? {
                  $ne: [
                    {
                      $ifNull: [targetFieldToExist, null],
                    },
                    null,
                  ],
                }
              : {},
          },
        },
        sort,
      ] as (PipelineStage | null)[]
    ).filter((stage) => !!stage) as PipelineStage[]
  );

  return res.json(organizeNotes(notes));
});

export const createNote = asyncHandler(async (req, res) => {
  req.body.user = req.user?._id;
  const note = await new Note(req.body).save();

  return res.json(organizeNotes(note));
});

export const favouriteToggle = (type: "add" | "remove") => {
  return asyncHandler(async (req, res) => {
    const { id: noteId } = req.params;
    const add = type === "add";
    const remove = type === "remove";
    const note = await Note.findById({
      _id: noteId,
      user: req.user!.id,
    }).select("addedToFavouriteAt");

    if (!note) {
      throw new ApiError(400, "Invalid ID!");
    }

    let addedToFavouriteAt = note.addedToFavouriteAt || null;
    if (add) {
      addedToFavouriteAt = addedToFavouriteAt || new Date();
    } else if (remove) {
      addedToFavouriteAt = null;
    }

    note.addedToFavouriteAt = addedToFavouriteAt;
    await note.save({ validateBeforeSave: false });

    return res.json({ typename: "note", id: noteId, addedToFavouriteAt });
  });
};

export const pinToggle = (type: "pin" | "unpin") => {
  return asyncHandler(async (req, res) => {
    const { id: noteId } = req.params;
    const pin = type === "pin";
    const unpin = type === "unpin";

    const note = await Note.findOne({ _id: noteId, user: req.user!.id }).select(
      "pinnedAt"
    );

    if (!note) {
      throw new ApiError(400, "Invalid ID!");
    }

    let pinnedAt = note.pinnedAt;

    if (pin) {
      pinnedAt = pinnedAt || new Date();
    } else if (unpin) {
      pinnedAt = null;
    }

    note.pinnedAt = pinnedAt;
    await note.save({ validateBeforeSave: false });

    return res.json({ typename: "note", id: noteId, pinnedAt });
  });
};

export const editNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;

  console.log({ noteId });

  const editedNote = await Note.findOneAndUpdate(
    { _id: noteId, user: req.user!.id },
    { $set: req.body },
    { new: true }
  );

  if (!editedNote) {
    throw new ApiError(400, "Invalid entry!");
  }

  return res.json(organizeNotes(editedNote));
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { id: noteId } = req.params;
  const response = await Note.deleteOne({ _id: noteId, user: req.user!.id });

  console.log({ response });

  return res.json({ id: noteId });
});
