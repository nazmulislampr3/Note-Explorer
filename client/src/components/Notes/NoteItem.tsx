import { Pin, Star, Trash } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import useDeleteNote from "../../hooks/apiHooks/noteHooks/useDeleteNote";
import useFavouriteToggle from "../../hooks/apiHooks/noteHooks/useFavouriteToggle";
import { NoteType } from "../../types";
import cn from "../../utils/cn";
import usePinToggle from "../../hooks/apiHooks/noteHooks/usePinToggle";

const NoteItem = ({ note }: { note: NoteType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchText = queryParams.get("search");
  let { id, addedToFavouriteAt, desc, theme, title, pinnedAt, hidden } = note;

  const [handleDelete] = useDeleteNote(id);
  const [handleFavouriteToggle] = useFavouriteToggle(note);
  const [handlePinToggle] = usePinToggle(note);

  const regExp = new RegExp(searchText || "", "gi");
  title = searchText
    ? title.replace(regExp, `<mark>${searchText}</mark>`)
    : title;
  desc = searchText ? desc.replace(regExp, `<mark>${searchText}</mark>`) : desc;

  return (
    <div
      className={cn(
        "note-item bg-slate-900 px-5 w-full aspect-video sm:max-w-96 border-2 border-transparent hover:border-slate-400 hover:border-2 cursor-pointer select-none shadow-xl shadow-slate-800 bg-cover bg-center flex flex-col transition-all duration-200",
        {
          hidden,
        }
      )}
      style={{
        backgroundImage: `url(${theme})`,
      }}
    >
      <div
        className="flex flex-col h-full"
        onClick={() => navigate(`/note/${id}`)}
      >
        <h3
          className="font-bold text-xl text-slate-200 py-4"
          dangerouslySetInnerHTML={{ __html: title || "Empty title" }}
        />
        <p
          className="py-0 overflow-hidden text-slate-300 h-full"
          dangerouslySetInnerHTML={{ __html: desc || "Empty desc" }}
        />
      </div>
      <div className="flex justify-between py-1.5 border-t icons">
        <Star
          className={cn({
            "fill-teal-500 stroke-teal-500": !!addedToFavouriteAt,
          })}
          onClick={() => handleFavouriteToggle()}
        />
        <Pin
          className={cn({
            "fill-teal-500 stroke-teal-500": !!pinnedAt,
          })}
          onClick={() => handlePinToggle()}
        />
        <Trash onClick={handleDelete} />
      </div>
    </div>
  );
};

export default NoteItem;
