import { useNavigate } from "react-router";
import { addNotes } from "../../../redux/slice/noteSlice";
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

type ResponseType = {
  note: NoteType;
  message: string;
};

const useCreateNote = (
  note: CommonNoteType,
  options?: QueryOptionsType<ResponseType, ApiErrorType>
) => {
  const {
    notes: { create },
  } = useApiUrl();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return useMutation<ResponseType, ApiErrorType, CommonNoteType>({
    apiUrl: create,
    query: note,
    onLoading() {
      options?.onLoading?.();
    },
    onComplete(data) {
      dispatch(addNotes(data.note));
      toastifyService.toastify(data.message);
      options?.onComplete?.(data);
      navigate("/");
    },
    onError(error) {
      options?.onLoading?.();
      toastifyService.toastify(error.message, {
        type: "warning",
      });
    },
    finally() {
      options?.finally?.();
    },
  });
};

export default useCreateNote;
