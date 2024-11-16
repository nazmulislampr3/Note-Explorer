import { createSlice } from "@reduxjs/toolkit";
import { NoteType } from "../../types";

type IntialState = {
  notes: NoteType[];
};

const initialState: IntialState = {
  // notes: [...notes],
  notes: [],
};

const sortNotesByDate = (a: NoteType, b: NoteType) => {
  return (
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
};

const sortNotesByPinned = (a: NoteType, b: NoteType) => {
  return (
    new Date(b.pinnedAt || 0).getTime() - new Date(a.pinnedAt || 0).getTime()
  );
};
const notesSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    addNotes: (state, action) => {
      state.notes = [
        ...state.notes,
        ...(Array.isArray(action.payload) ? action.payload : [action.payload]),
      ]
        .sort(sortNotesByDate)
        .sort(sortNotesByPinned);
    },
    updateNote: (state, action) => {
      const { id } = action.payload;
      const noteRef = state.notes.find(({ id: noteId }) => noteId === id);
      if (noteRef) {
        Object.assign(noteRef, action.payload);
      }
      state.notes = state.notes.sort(sortNotesByDate).sort(sortNotesByPinned);
    },
    deleteNote: (state, action) => {
      const { id } = action.payload;
      state.notes = state.notes.filter((noteItem) => noteItem.id !== id);
    },
  },
});

const notesReducer = notesSlice.reducer;
export default notesReducer;
export const { addNotes, deleteNote, updateNote } = notesSlice.actions;
