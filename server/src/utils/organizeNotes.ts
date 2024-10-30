import { NoteType } from "../types";

const organize = (noteItem: any): NoteType => {
  const { _id, title, desc, addedToFavouriteAt, pinnedAt, theme, createdAt } =
    noteItem;
  return {
    typename: "note",
    id: _id,
    title: title || "",
    desc: desc || "",
    addedToFavouriteAt: addedToFavouriteAt || null,
    pinnedAt: pinnedAt || null,
    theme: theme || null,
    createdAt,
  };
};

const organizeNotes = (note: any): NoteType | NoteType[] => {
  if (Array.isArray(note)) {
    return note.map((noteItem) => organize(noteItem));
  }

  return organize(note);
};

export default organizeNotes;
