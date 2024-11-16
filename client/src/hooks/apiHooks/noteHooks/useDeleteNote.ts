import { useEffect, useRef, useState } from "react";
import { deleteNote, updateNote } from "../../../redux/slice/noteSlice";
import useAppDispatch from "../../../redux/useAppDispatch";
import {
  ApiErrorType,
  ApiResponseDataType,
  MutationReturnType,
} from "../../../types";
import toastifyService from "../../../utils/toastify/service";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

const useDeleteNote = (
  noteId: string
): MutationReturnType<ApiResponseDataType | null, ApiErrorType | null> => {
  const [deleteThisNote, setDeleteThisNote] = useState<boolean>(false);
  const { notes } = useApiUrl();
  const dispatch = useAppDispatch();

  const timeoutRef = useRef<any>(undefined);
  const deleteNoteRef = useRef<any>(deleteThisNote);

  useEffect(() => {
    deleteNoteRef.current = deleteThisNote;
  }, [deleteThisNote]);

  const [handleSubmit, { loading, data, error }] = useMutation<
    ApiResponseDataType,
    ApiErrorType
  >({
    apiUrl: notes.delete(noteId),
    method: "DELETE",
    onLoading() {
      dispatch(updateNote({ id: noteId, hidden: true }));
    },
    onComplete() {
      dispatch(deleteNote({ id: noteId }));
    },
  });

  const handleDelete = () => {
    setDeleteThisNote(true);
    dispatch(updateNote({ id: noteId, hidden: true }));
    timeoutRef.current = setTimeout(() => {
      handleSubmit();
    }, 5000);
    toastifyService.toastify("The note has been deleted.", {
      type: "warning",
      onUndo() {
        setDeleteThisNote(false);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
        dispatch(updateNote({ id: noteId, hidden: false }));
      },
    });
  };

  useEffect(() => {
    return () => {
      if (deleteNoteRef.current) {
        handleSubmit();
      }
    };
  }, []);

  return [handleDelete, { data, error, loading }];
};

export default useDeleteNote;
