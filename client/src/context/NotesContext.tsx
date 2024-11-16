import { ReactNode } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { updateNote } from "../redux/slice/noteSlice";
import useAppDispatch from "../redux/useAppDispatch";
import useAppSelector from "../redux/useAppSelector";
import { NoteType } from "../types";
import toastifyService from "../utils/toastify/service";

type ContextValue = {
  allNotes: NoteType[];
  favouriteNotes: NoteType[];
  pinnedNotes: NoteType[];
  handleDelete: (id: string) => void;
};

const notesContext = createContext<ContextValue | null>(null);

const NotesContextProvider = ({ children }: { children: ReactNode }) => {
  let { notes } = useAppSelector((state) => state.notes);

  const sortByFavourite = (a: NoteType, b: NoteType) => {
    return (
      new Date(b.addedToFavouriteAt || 0).getTime() -
      new Date(a.addedToFavouriteAt || 0).getTime()
    );
  };

  const sortByPin = (a: NoteType, b: NoteType) => {
    return (
      new Date(b.pinnedAt || 0).getTime() - new Date(a.pinnedAt || 0).getTime()
    );
  };

  const favouriteNotes = [...notes].filter(
    ({ addedToFavouriteAt }) => !!addedToFavouriteAt
  );
  favouriteNotes.sort(sortByFavourite).sort(sortByPin);

  const pinnedNotes = [...notes].filter(({ pinnedAt }) => !!pinnedAt);
  pinnedNotes.sort(sortByPin);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    toastifyService.toastify("The note has been deleted!", {
      type: "warning",
      onStart() {
        dispatch(
          updateNote({
            id,
            hidden: true,
          })
        );
      },
      onUndo() {
        dispatch(
          updateNote({
            id,
            hidden: false,
          })
        );
      },
    });
  };

  return (
    <notesContext.Provider
      value={{ allNotes: notes, favouriteNotes, pinnedNotes, handleDelete }}
    >
      {children}
    </notesContext.Provider>
  );
};

export default NotesContextProvider;

export const useNotesContext = () =>
  useContextSelector(notesContext, (value) => value);
