import {
  CalendarHeart,
  LockKeyhole,
  LogOut,
  Pin,
  ReceiptText,
  User,
} from "lucide-react";
import { MenuType } from "../types";
import cn from "../utils/cn";
import { useUIContext } from "../context/UIContext";
import { useLocation, useNavigate } from "react-router";

const Sidebar = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  const menu: MenuType[][] = [
    [
      {
        name: "User Info",
        Icon: User,
        url: "/user-info",
      },
      {
        name: "Security",
        Icon: LockKeyhole,
        url: "/security",
      },
    ],
    [
      {
        name: "All",
        Icon: ReceiptText,
        url: "/",
      },
      {
        name: "Favourites",
        Icon: CalendarHeart,
        url: "/notes/favourites",
      },
      {
        name: "Pinned",
        Icon: Pin,
        url: "/notes/pinned",
      },
    ],

    [
      {
        name: "Logout",
        Icon: LogOut,
      },
    ],
  ];
  const { activeTool, setActiveTool } = useUIContext()!;
  const expanded = activeTool === "sidebar";
  const expandedOnSm = activeTool === "sidebar_on_sm";

  const handleClick = ({ url, fn }: MenuType) => {
    if (url) {
      navigate(url);
    }
    if (fn) {
      fn();
    }
    if (expanded) setActiveTool(null);
  };

  return (
    <aside
      className={cn(
        "sidebar absolute z-50 h-full bg-slate-900 shadow-slate-800 shadow-lg w-0 overflow-hidden sm:overflow-visible sm:w-auto sm:relative transition-all duration-200 select-none",
        {
          "w-full left-0 top-0": expanded,
        }
      )}
      // It is for only >sm devices
      onMouseLeave={() =>
        setActiveTool((prev) => (prev === "sidebar_on_sm" ? null : prev))
      }
    >
      <nav className="h-full w-full p-2 flex flex-col justify-between">
        {menu.map((menuItem, index) => {
          return (
            <ul className="flex flex-col gap-2" key={index}>
              {menuItem.map((menuItem) => {
                const { Icon, name, fn, url } = menuItem;
                const active = url ? url === pathname : false;
                return (
                  <li
                    key={name}
                    className={cn(
                      "menu-item w-full flex items-center text-slate-300 rounded-2xl cursor-pointer menu-item transition-transform duration-200",
                      {
                        "bg-teal-500 text-slate-200": active,
                        "hover:bg-blue-500 text-slate-200": !active,
                      }
                    )}
                    onClick={() => handleClick(menuItem)}
                  >
                    <div
                      className="icon size-12 flex items-center justify-center shrink-0"
                      onClick={() => setActiveTool("sidebar_on_sm")}
                    >
                      <Icon className="size-1/2" />
                      {!expandedOnSm && !expanded ? (
                        <div
                          className="abbr absolute hidden sm:block left-[115%] text-nowrap bg-slate-800 shadow-lg shadow-slate-800 px-8 py-1.5 rounded-lg -translate-y-5 -translate-x-5 transition-all duration-200 opacity-0 pointer-events-none"
                          style={{
                            borderBottomLeftRadius: "0",
                          }}
                        >
                          {name}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={cn(
                        "w-full sm:w-0 transition-all duration-200 text-lg text-nowrap overflow-hidden",
                        {
                          "sm:w-64": expandedOnSm,
                        }
                      )}
                    >
                      {name}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
