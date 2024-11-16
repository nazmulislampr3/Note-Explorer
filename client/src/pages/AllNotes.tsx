import Notes from "../components/Notes";
import { useNotesContext } from "../context/NotesContext";

const AllNotes = () => {
  const { allNotes } = useNotesContext()!;
  return <Notes notes={allNotes} />;
};

export default AllNotes;
