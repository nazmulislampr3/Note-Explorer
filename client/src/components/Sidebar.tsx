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

const Sidebar = () => {
  // const [expanded, setExpanded] = useState<boolean>(false);
  const menu: MenuType[][] = [
    [
      {
        name: "User Info",
        Icon: User,
      },
      {
        name: "Security",
        Icon: LockKeyhole,
      },
    ],
    [
      {
        name: "All",
        Icon: ReceiptText,
      },
      {
        name: "Favourites",
        Icon: CalendarHeart,
      },
      {
        name: "Pinned",
        Icon: Pin,
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

  return (
    <aside
      className={cn(
        "sidebar h-full bg-slate-800 shadow-slate-800 shadow-lg w-0 overflow-hidden sm:overflow-visible sm:w-auto relative transition-all duration-200 select-none",
        {
          "w-full": expanded,
        }
      )}
      // It is for only >sm devices
      onMouseLeave={() =>
        setActiveTool((prev) => (prev === "sidebar_on_sm" ? null : prev))
      }
    >
      <nav className="h-full w-full p-2 flex flex-col justify-between">
        {menu.map((menuItem) => {
          return (
            <ul className="flex flex-col gap-2">
              {menuItem.map(({ Icon, name }) => {
                return (
                  <li className="menu-item w-full flex items-center text-slate-300 rounded-2xl cursor-pointer hover:bg-pink-500 hover:text-slate-200 menu-item transition-transform duration-200">
                    <div
                      className="icon size-12 flex items-center justify-center shrink-0"
                      onClick={() => setActiveTool("sidebar_on_sm")}
                    >
                      <Icon className="size-1/2" />
                      {!expandedOnSm && !expanded ? (
                        <div
                          className="abbr absolute hidden sm:block left-[115%] text-nowrap bg-slate-800 shadow-lg shadow-slate-800 px-8 py-1.5 rounded-lg -translate-y-5 -translate-x-5 transition-all duration-200 opacity-0"
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
