import { LucideProps, Settings } from "lucide-react";

export type LucidIconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export type QueryError<T> = T;

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

export type MenuType = {
  name: string;
  Icon: LucidIconType;
  url?: string;
  fn?: () => void;
};
