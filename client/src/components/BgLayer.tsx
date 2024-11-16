import { ReactNode } from "react";

const BgLayer = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className="fixed w-full h-full top-0 left-0 z-[200] flex items-center justify-center"
      style={{
        background: `rgba(0, 0, 0, 0.4)`,
      }}
    >
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={() => onClick?.()}
      ></div>
      <div className="z-20 w-full">{children}</div>
    </div>
  );
};

export default BgLayer;
