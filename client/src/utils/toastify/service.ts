import uid from "react-uuid";

export type ToastifyMessageType = "warning" | "success";

export type ToastType = {
  id: string;
  message: string;
  onStart: (() => void) | null;
  onUndo: (() => void) | null;
  onEnd: (() => void) | null;
  type: ToastifyMessageType;
  position: ToastifyPosition;
};

export type ToastifyPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

export type ToastInputOptions = {
  type?: ToastifyMessageType;
  position?: ToastifyPosition;
  onStart?: (() => void) | null;
  onUndo?: () => void;
  onEnd?: (() => void) | null;
};

type EventListener = (toasts: Set<ToastType>) => void;

class ToastifyService {
  listeners: Set<EventListener> = new Set();
  toasts: Set<ToastType> = new Set();

  addListener(listener: EventListener) {
    this.listeners.add(listener);
  }

  removeListener(listener: EventListener) {
    this.listeners.delete(listener);
  }

  removeToast(toast: ToastType) {
    this.toasts.delete(toast);
    this.showToast();
  }

  toastify(message: string, options?: ToastInputOptions) {
    const toast = {
      id: uid(),
      message,
      onEnd: options?.onEnd || null,
      onStart: options?.onStart || null,
      onUndo: options?.onUndo || null,
      position: options?.position || "bottom-left",
      type: options?.type || "success",
    };
    this.toasts.add(toast);
    this.showToast();
  }

  private showToast() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }
}

const toastifyService = new ToastifyService();
export default toastifyService;
