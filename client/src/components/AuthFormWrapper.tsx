import { ReactNode } from "react";
import { logo } from "../data/images";

const AuthFormWrapper = ({
  children,
  includeLogo = false,
}: {
  children: ReactNode;
  includeLogo?: boolean;
}) => {
  return (
    <div className="flex items-center md:p-2 h-full">
      <div className="w-full h-full overflow-y-auto scrollbar">
        <div className="w-full min-h-full flex items-center justify-evenly">
          {includeLogo ? (
            <img src={logo} alt="Logo" className="invert hidden lg:block" />
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
