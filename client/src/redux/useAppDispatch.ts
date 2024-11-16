import { useDispatch } from "react-redux";
import { AppDispath } from "./store";

const useAppDispatch = useDispatch.withTypes<AppDispath>();
export default useAppDispatch;
