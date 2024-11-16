import { NotebookPen, StickyNote } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyNote = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col  items-center gap-4">
        <StickyNote className="size-20" />
        <span className="text-3xl">No notes available</span>
        <Link
          to={"/write-note"}
          className="text-xl flex items-center gap-2 hover:text-blue-300"
        >
          <NotebookPen />
          Write a note.
        </Link>
      </div>
    </div>
  );
};

export default EmptyNote;
