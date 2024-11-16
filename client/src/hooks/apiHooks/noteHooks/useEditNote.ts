import { useNavigate } from "react-router";
import { updateNote } from "../../../redux/slice/noteSlice";
import useAppDispatch from "../../../redux/useAppDispatch";
import {
  ApiErrorType,
  CommonNoteType,
  NoteType,
  QueryOptionsType,
} from "../../../types";
import toastifyService from "../../../utils/toastify/service";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

type ResopnseType = { note: NoteType; message: string };
const useEditNote = (
  note: CommonNoteType,
  options?: QueryOptionsType<ResopnseType, ApiErrorType>
) => {
  const {
    notes: { edit },
  } = useApiUrl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<ResopnseType, ApiErrorType, CommonNoteType>({
    apiUrl: edit,
    query: note,
    method: "PUT",
    onLoading() {
      options?.onLoading?.();
    },
    onComplete(data) {
      dispatch(updateNote(data.note));
      toastifyService.toastify(data.message);
      options?.onComplete?.(data);
      navigate("/");
    },
    onError(error) {
      options?.onError?.(error);
      toastifyService.toastify(error.message, { type: "warning" });
    },
    finally() {
      options?.finally?.();
    },
  });
};

export default useEditNote;
