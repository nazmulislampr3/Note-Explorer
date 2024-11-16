import { ImagePlus, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { blankUser } from "../data/images";
import useUploadAvatar from "../hooks/apiHooks/authHooks/useUploadAvatar";
import cn from "../utils/cn";
import { ApiErrorType } from "../types";
import extractImageFromFile from "../utils/extractImageFromFile";

type PropsType = JSX.IntrinsicElements["div"];

const UserImgInput = ({
  value,
  className,
  onComplete,
  onLoading,
  onError,
  onEnd,
  ...props
}: PropsType & {
  value: string;
  onLoading?: () => void;
  onComplete?: (value: string) => void;
  onError?: (error: ApiErrorType) => void;
  onEnd?: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<string>("");

  const imageInputRef = useRef<any>(null);

  const { loading: uploading } = useUploadAvatar(file, {
    onLoading() {
      onLoading?.();
    },
    onComplete(data) {
      setFile(null);
      setBlob("");
      onComplete?.(data.url);
    },
    onError(error) {
      onError?.(error);
    },
    finally() {
      onEnd?.();
    },
  });

  useEffect(() => {
    if (file) {
      extractImageFromFile(file).then((value) => setBlob(value!));
    }
  }, [file]);

  const imgSrc = blob || value;

  return (
    <div
      className={cn("w-3/5 max-w-80 relative user-img-input", className)}
      {...props}
    >
      <img
        className="w-full aspect-square object-cover object-center"
        src={imgSrc}
        alt="profile image"
      />
      <div
        className={cn(
          "size-full absolute inset-0 md:opacity-0 hover:opacity-100",
          {
            "opacity-100": uploading,
          }
        )}
      >
        <div className="bg-slate-800 opacity-50 absolute inset-0"></div>
        <div className="z-50 flex items-center justify-center size-full">
          {!uploading ? (
            <ImagePlus
              className="cursor-pointer"
              onClick={() => {
                imageInputRef.current?.click();
              }}
            />
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
        </div>
      </div>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        ref={imageInputRef}
      />
    </div>
  );
};

export default UserImgInput;
