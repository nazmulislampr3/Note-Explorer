import { CirclePlus } from "lucide-react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { NoteType } from "../../types";
import EmptyNote from "./EmptyNote";
import NoteItem from "./NoteItem";

const Notes = ({ notes }: { notes: NoteType[] }) => {
  return (
    <>
      {notes.length ? (
        <>
          {/* <ToastContainer /> */}

          <div className="flex justify-center flex-wrap gap-2 items-center">
            {notes?.map((item) => (
              <NoteItem note={item} key={item.id} />
            ))}
          </div>
          <Link to={"/write-note"}>
            <CirclePlus className="fixed right-3 sm:right-10 bottom-3 sm:bottom-10 size-10 sm:size-16 fill-blue-400 cursor-pointer" />
          </Link>
        </>
      ) : (
        <EmptyNote />
      )}
      <Outlet />
    </>
  );
};

export default Notes;
