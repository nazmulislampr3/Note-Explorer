import { updateNote } from "../../../redux/slice/noteSlice";
import useAppDispatch from "../../../redux/useAppDispatch";
import { ApiErrorType, NoteType } from "../../../types";
import toastifyService from "../../../utils/toastify/service";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

type ResponseType = {
  id: string;
  pinnedAt: string;
};
type QueryType = {
  pinnedAt: string | null;
};

const usePinToggle = (note: NoteType | null) => {
  const {
    notes: { pinToggle },
  } = useApiUrl();

  const prevValue = note?.pinnedAt;
  const pinnedAt = note?.pinnedAt ? null : new Date().toISOString();

  const dispatch = useAppDispatch();

  return useMutation<ResponseType, ApiErrorType, QueryType>({
    apiUrl: note?.id ? pinToggle(note?.id) : "",
    method: "PUT",
    query: { pinnedAt },
    onLoading() {
      dispatch(updateNote({ id: note?.id, pinnedAt }));
      toastifyService.toastify(
        pinnedAt ? "The note has been pinned!" : "The note has been unpinned!"
      );
    },
    onError(error) {
      dispatch(updateNote({ id: note?.id, pinnedAt: prevValue }));
      toastifyService.toastify(error.message, { type: "warning" });
    },
  });
};

export default usePinToggle;
