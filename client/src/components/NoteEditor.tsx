import {
  ArrowLeft,
  CircleCheck,
  CircleX,
  Edit,
  LoaderCircle,
  Palette,
  Pin,
  Star,
  Trash,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import BgLayer from "../components/BgLayer";
import { useNotesContext } from "../context/NotesContext";
import useCreateNote from "../hooks/apiHooks/noteHooks/useCreateNote";
import useEditNote from "../hooks/apiHooks/noteHooks/useEditNote";
import useFavouriteToggle from "../hooks/apiHooks/noteHooks/useFavouriteToggle";
import usePinToggle from "../hooks/apiHooks/noteHooks/usePinToggle";
import { NoteType, WriteNoteType } from "../types";
import cn from "../utils/cn";
import moveCursorToEnd from "../utils/moveCursorToEnd";
import themes from "../utils/themes";

const NoteEditor = ({ note }: { note?: NoteType }) => {
  const writeNewNote = !note?.id;
  const initialValue = {
    desc: note?.desc || "",
    theme: note?.theme || "",
    title: note?.title || "",
  };
  const [noteData, setNoteData] = useState<WriteNoteType>(initialValue);
  const { desc, theme, title } = noteData;
  const [editMode, setEditMode] = useState<boolean>(
    writeNewNote ? true : false
  );
  const [themeList, setThemeList] = useState<boolean>(false);
  const descRef = useRef<any>(null);
  const titleRef = useRef<any>(null);

  const { handleDelete } = useNotesContext()!;
  const navigate = useNavigate();

  const [handleCreateNote, { loading: creating }] = useCreateNote(noteData);
  const [handleEditNote, { loading: editing }] = useEditNote(noteData);
  const [handlePinNote] = usePinToggle(writeNewNote ? null : note);
  const [handleFavouriteToggle] = useFavouriteToggle(
    writeNewNote ? null : note
  );

  const loading = creating || editing;

  useEffect(() => {
    if (editMode) {
      if (!writeNewNote && descRef.current) {
        descRef.current?.focus();
        moveCursorToEnd(descRef);
      } else if (writeNewNote && titleRef.current) {
        titleRef.current?.focus();
      }
    }
  }, [editMode, writeNewNote, descRef.current, titleRef.current]);

  const handleExit = () => {
    if (!loading) {
      window.history.state?.idx > 1 ? window.history.back() : navigate("/");
    }
  };

  const handleSave = () => {
    setEditMode(false);
    setThemeList(false);
    if (writeNewNote) {
      handleCreateNote();
    } else {
      handleEditNote();
    }
  };

  const handleCancel = () => {
    setNoteData(initialValue);
    if (writeNewNote) {
      titleRef.current.focus();
    } else {
      setThemeList(false);
      setEditMode(false);
    }
  };

  return (
    <BgLayer onClick={handleExit}>
      <div
        className={cn(
          "note w-screen max-w-3xl bg-slate-900 h-[90vh] overflow-y-auto px-2 sm:px-5 border-4 border-slate-600 flex flex-col justify-between bg-cover bg-no-repeat bg-center m-auto",
          {
            loading,
          }
        )}
        style={
          theme
            ? {
                backgroundImage: `url(${theme})`,
              }
            : {}
        }
      >
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="py-3 flex justify-between">
            <ArrowLeft onClick={handleExit} />
            {note ? (
              <div className="flex gap-4">
                <Star
                  className={cn({
                    "fill-teal-400 stroke-teal-400": (note as NoteType)
                      .addedToFavouriteAt,
                  })}
                  onClick={() => handleFavouriteToggle()}
                />
                <Pin
                  className={cn({
                    "fill-teal-400 stroke-teal-400": (note as NoteType)
                      ?.pinnedAt,
                  })}
                  onClick={() => handlePinNote()}
                />
                <Trash
                  onClick={() => {
                    handleDelete(note.id);
                    handleExit();
                  }}
                />
              </div>
            ) : null}
          </div>
          {!editMode || loading ? (
            <h3
              className={cn("title", {
                "text-slate-400": loading,
              })}
            >
              {title}
              {/* Adjust height */}
              <span className="opacity-0 w-0 pointer-events-none">k</span>
            </h3>
          ) : (
            <input
              ref={titleRef}
              className="title"
              type="text"
              value={title}
              placeholder="Enter your title..."
              onChange={(e) =>
                setNoteData(
                  (prev) => prev && { ...prev, title: e.target.value }
                )
              }
            />
          )}
          <div className="h-full w-full py-1 overflow-hidden">
            {!editMode || loading ? (
              <div
                className={cn("desc overflow-y-auto", {
                  "text-slate-400": loading,
                })}
              >
                {desc}
              </div>
            ) : (
              <div className={cn("desc overflow-y-hidden")}>
                <textarea
                  className="w-full h-full resize-none overflow-y-auto bg-transparent outline-none scrollbar"
                  ref={descRef}
                  placeholder="Enter the description..."
                  onChange={(e) =>
                    setNoteData(
                      (prev) => prev && { ...prev, desc: e.target.value }
                    )
                  }
                  value={desc}
                />
              </div>
            )}
          </div>
        </div>

        {themeList ? (
          <div className="flex gap-3 py-3 w-full overflow-y-hidden overflow-x-auto scrollbar">
            <button
              className="size-14 bg-slate-900 text-xs border-2 border-slate-400 rounded-sm cursor-pointer flex-shrink-0"
              onClick={() =>
                setNoteData((prev) => prev && { ...prev, theme: "" })
              }
            />
            {themes.map((theme, index) => (
              <img
                src={theme}
                alt="theme"
                className="size-14 object-cover border-2 border-slate-400 rounded-sm cursor-pointer"
                onClick={() => {
                  setNoteData((prev) => prev && { ...prev, theme });
                }}
                key={index}
              />
            ))}
          </div>
        ) : null}
        <div className="flex justify-between py-2 border-t icons">
          {!editMode ? (
            <>
              <div className="flex gap-4">
                <Edit onClick={() => setEditMode(true)} />
              </div>
              <div className="flex gap-4"></div>
            </>
          ) : (
            <>
              <div className="flex gap-4">
                <Palette
                  className={cn({
                    "bg-slate-600": themeList,
                    disabled: loading,
                  })}
                  onClick={() => setThemeList((prev) => !prev)}
                />
              </div>
              <div className="flex gap-4">
                {!loading ? (
                  <>
                    <CircleX onClick={handleCancel} />
                    <CircleCheck onClick={handleSave} />
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <LoaderCircle className="animate-spin" />
                      <span>Please wait...</span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </BgLayer>
  );
};

export default NoteEditor;
