import { useEffect, useState } from "react";
import toastifyService, { ToastType } from "./service";

const useToastify = (): ToastType[] => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    const handleListener = (toastList: Set<ToastType>) => {
      setToasts([...toastList]);
    };
    toastifyService.addListener(handleListener);

    return () => toastifyService.removeListener(handleListener);
  }, []);

  return toasts;
};

export default useToastify;
