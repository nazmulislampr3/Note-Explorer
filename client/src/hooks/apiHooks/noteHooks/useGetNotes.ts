import { addNotes } from "../../../redux/slice/noteSlice";
import useAppDispatch from "../../../redux/useAppDispatch";
import { NoteType } from "../../../types";
import useApiUrl from "../../useApiUrl";
import useQuery from "../useQuery";

const useGetNotes = () => {
  const {
    notes: { main },
  } = useApiUrl()!;

  const dispatch = useAppDispatch();

  return useQuery<NoteType[], null>(main, {
    onComplete(data) {
      dispatch(addNotes(data));
    },
  });
};

export default useGetNotes;
