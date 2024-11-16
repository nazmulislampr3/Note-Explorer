import { useEffect } from "react";

const useOutsideClick = (
  elemRef: React.MutableRefObject<any>,
  callback: () => void
) => {
  const handleClick = (e: any) => {
    if (!elemRef.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
};

export default useOutsideClick;
