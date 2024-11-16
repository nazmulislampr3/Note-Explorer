import { LucideProps } from "lucide-react";

export type LucidIconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export type QueryError<T> = T;

export type ApiErrorType<
  T = {
    message: string;
  }
> = T;

export type ApiResponseDataType<
  T = {
    message: string;
  }
> = T;

export type QueryType<DataType, ErrorType = undefined> = {
  loading: boolean;
  error: QueryError<ErrorType>;
  data: DataType;
};

export type MutationType<DataType, ErrorType> = {
  loading: boolean;
  error: ErrorType;
  data: DataType;
  submit: () => Promise<DataType>;
};

export type MutationReturnType<ResponseDataType = null, ErrorType = null> = [
  handleSubmit: () => void,
  { data: ResponseDataType; error: ErrorType; loading: boolean }
];

export type LoginDataType = { password: string; email: string };

export type MenuType = {
  name: string;
  Icon: LucidIconType;
  url?: string;
  fn?: () => void;
};

export type QueryOptionsType<ResponseDataType, ErrorType> = {
  onComplete?: (data: ResponseDataType) => void;
  onError?: (error: ErrorType) => void;
  onLoading?: () => void;
  finally?: () => void;
};

export type QueryReturnType<T1, T2> = {
  data: T1 | null;
  loading: boolean;
  error: T2 | null;
};

export type CommonNoteType = {
  title: string;
  desc: string;
  theme: string;
};

export type UserType = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  birthdate: string;
  avatar?: string;
};

export type NoteType = CommonNoteType & {
  id: string;
  addedToFavouriteAt: Date | string | null;
  pinnedAt: Date | string | null;
  createdAt: Date | string;
  hidden?: boolean | null;
};

export type WriteNoteType = CommonNoteType;
