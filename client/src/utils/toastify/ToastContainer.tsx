import ToastItem from "./ToastItem";
import useToastify from "./useToastify";

const ToastContainer = () => {
  const toasts = useToastify();
  return (
    <div>
      {toasts.map((item, index) => {
        return <ToastItem toast={item} index={index} key={item.id} />;
      })}
    </div>
  );
};

export default ToastContainer;
