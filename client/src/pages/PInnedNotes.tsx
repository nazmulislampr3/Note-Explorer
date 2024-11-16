import Notes from "../components/Notes";
import { useNotesContext } from "../context/NotesContext";

const PInnedNotes = () => {
  const { pinnedNotes } = useNotesContext()!;
  return <Notes notes={pinnedNotes} />;
};

export default PInnedNotes;
