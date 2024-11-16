import { CheckCheck, TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import cn from "../cn";
import toastifyService, { ToastType } from "./service";

const ToastItem = ({ toast, index }: { toast: ToastType; index: number }) => {
  const { type, message, onUndo, position, onEnd, onStart } = toast;
  const timeout = 5; // in seconds
  const [visible, setVisible] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [remainingSecond, setRemainingSecond] = useState<number>(timeout);

  const warning = type === "warning";
  const success = type === "success";
  const Icon = warning ? TriangleAlert : CheckCheck;

  const seconds = [...new Array(timeout)].map((_, index) => index + 1);

  useEffect(() => {
    setVisible(true);
    onStart?.();
    const interval = setInterval(() => {
      setRemainingSecond((prev) => Math.max(prev - 1, 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const deleteToast = () => {
    setHidden(true);
    setTimeout(() => {
      toastifyService.removeToast(toast);
    }, 300);
  };

  useEffect(() => {
    if (remainingSecond <= 1) {
      const timeoutRef = setTimeout(() => {
        onEnd?.();
        setHidden(true);
      }, 1000);
      const timeoutRef2 = setTimeout(() => {
        toastifyService.removeToast(toast);
      }, 1300);
      return () => {
        clearTimeout(timeoutRef);
        clearTimeout(timeoutRef2);
      };
    }
  }, [remainingSecond]);

  return (
    <div
      className={cn(
        "toastify-item sm:toastify-item-sm w-full sm:w-auto sm:min-w-96 fixed z-[9999] py-2 sm:py-4 px-3 sm:px-4 shadow-xl shadow-slate-800 flex justify-between items-center gap-5 bottom-4 sm:bottom-10 transition-all duration-300",
        {
          "bg-sky-600": success,
          "bg-red-500": warning,
        }
      )}
      style={
        position === "bottom-left"
          ? {
              transform: !visible
                ? `translateX(var(--translateX)) translateY(250%)`
                : !hidden
                ? `translateX(var(--translateX)) translateY(-${
                    100 * index * 1.3
                  }%)`
                : `translateX(-110%) translateY(-${100 * index * 1.3}%)`,
            }
          : {}
      }
    >
      <div
        className={cn(
          "text-sm sm:text-lg font-medium flex gap-2 items-center text-slate-300"
        )}
      >
        <Icon />
        <span>{message}</span>
      </div>
      <div className="flex items-center gap-2">
        {onUndo ? (
          <>
            <div className="size-8 aspect-square border-2 flex-shrink-0 rounded-full relative overflow-hidden">
              <div
                className="absolute w-full flex flex-col transition-all duration-300"
                style={{
                  bottom: `-${(timeout - remainingSecond) * 100}%`,
                }}
              >
                {seconds.map((second) => (
                  <div
                    className="w-full aspect-square flex items-center justify-center"
                    key={second}
                  >
                    {second}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                onUndo();
                deleteToast();
              }}
              className="font-bold text-blue-200 text-sm"
            >
              Undo
            </button>
          </>
        ) : (
          <button>
            <X
              onClick={() => {
                deleteToast();
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToastItem;
