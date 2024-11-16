import { useParams } from "react-router";
import NoteEditor from "../components/NoteEditor";
import { useNotesContext } from "../context/NotesContext";

const Note = () => {
  const { id } = useParams();
  const { allNotes } = useNotesContext()!;
  const currentNote = allNotes.find(({ id: noteId }) => id === noteId);

  return <>{currentNote ? <NoteEditor note={currentNote} /> : null}</>;
};

export default Note;
