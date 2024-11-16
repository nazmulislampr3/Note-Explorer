import { updateNote } from "../../../redux/slice/noteSlice";
import useAppDispatch from "../../../redux/useAppDispatch";
import { ApiErrorType, ApiResponseDataType, NoteType } from "../../../types";
import toastifyService from "../../../utils/toastify/service";
import useApiUrl from "../../useApiUrl";
import useMutation from "../useMutation";

type QueryType = {
  addedToFavouriteAt: null | string;
};
const useFavouriteToggle = (note: NoteType | null) => {
  const {
    notes: { favouriteToggle },
  } = useApiUrl();
  const prevValue = note?.addedToFavouriteAt;
  const addedToFavouriteAt = note?.addedToFavouriteAt
    ? null
    : new Date().toISOString();

  const added = !!addedToFavouriteAt;

  const dispatch = useAppDispatch();

  return useMutation<ApiResponseDataType, ApiErrorType, QueryType>({
    apiUrl: favouriteToggle(note?.id || ""),
    method: "PUT",
    query: {
      addedToFavouriteAt,
    },
    onLoading() {
      dispatch(updateNote({ id: note?.id, addedToFavouriteAt }));
      toastifyService.toastify(
        added
          ? "The note has been added to the favourites!"
          : "The note has been removed from the favourites!"
      );
    },
    onError(error) {
      dispatch(updateNote({ id, addedToFavouriteAt: prevValue }));
      toastifyService.toastify(error.message, { type: "warning" });
    },
  });
};

export default useFavouriteToggle;
