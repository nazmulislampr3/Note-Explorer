import Notes from "../components/Notes";
import { useNotesContext } from "../context/NotesContext";

const FavouriteNotes = () => {
  const { favouriteNotes } = useNotesContext()!;
  return <Notes notes={favouriteNotes} />;
};

export default FavouriteNotes;
