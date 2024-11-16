import { PipelineStage, Types } from "mongoose";
import { Note } from "./../models/note.model";
import asyncHandler from "./../utils/asyncHandler";
import organizeNotes from "./../utils/organizeNotes";
import ApiError from "./../utils/ApiError";

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

  return res.json({ note: organizeNotes(note), message: "New note created!" });
});

export const favouriteToggle = asyncHandler(async (req, res) => {
  const { id: noteId } = req.params;
  const { addedToFavouriteAt } = req.body;

  const note = await Note.findById({
    _id: noteId,
    user: req.user!.id,
  }).select("addedToFavouriteAt");

  if (!note) {
    throw new ApiError(400, "Invalid ID!");
  }

  note.addedToFavouriteAt = addedToFavouriteAt;
  await note.save({ validateBeforeSave: false });

  return res.json({ id: noteId, addedToFavouriteAt });
});

export const pinToggle = asyncHandler(async (req, res) => {
  const { id: noteId } = req.params;
  const { pinnedAt } = req.body;
  const note = await Note.findOne({ _id: noteId, user: req.user!.id }).select(
    "pinnedAt"
  );

  if (!note) {
    throw new ApiError(400, "Invalid ID!");
  }

  note.pinnedAt = pinnedAt;
  await note.save({ validateBeforeSave: false });

  return res.json({ id: noteId, pinnedAt });
});

export const editNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;

  const editedNote = await Note.findOneAndUpdate(
    { _id: noteId, user: req.user!._id },
    { $set: req.body },
    { new: true }
  );

  if (!editedNote) {
    throw new ApiError(400, "Invalid entry!");
  }

  return res.json({
    note: organizeNotes(editedNote),
    message: "Successfully updated note!",
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { id: noteId } = req.params;
  await Note.deleteOne({ _id: noteId, user: req.user!.id });

  return res.json({ message: "The note has been deleted!" });
});
