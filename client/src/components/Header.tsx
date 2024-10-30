import { Menu, Search, X } from "lucide-react";
import cn from "../utils/cn";
import { useUIContext } from "../context/UIContext";
import { useEffect, useRef } from "react";

const Header = () => {
  const { activeTool, setActiveTool } = useUIContext()!;
  const searchBar = activeTool === "searchbar";
  const searchbarRef = useRef<any>(null);

  useEffect(() => {
    if (searchBar) {
      searchbarRef.current.focus();
    }
  }, [activeTool]);

  return (
    <div className="shadow-sm shadow-slate-800 flex flex-col justify-center py-2 relative header bg-slate-900 z-50">
      <div className={cn("px-5 flex items-center justify-between")}>
        <div className="flex gap-3 items-center justify-center">
          <div
            className={cn(
              "sm:hidden size-10 flex items-center justify-center hover:bg-slate-500 cursor-pointer rounded-md"
            )}
            onClick={() =>
              setActiveTool((prev) => (prev === "sidebar" ? null : "sidebar"))
            }
          >
            <Menu className="size-3/5" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-teal-300 text-nowrap select-none">
            Note Explorer
          </div>
        </div>
        <input
          type="text"
          className="bg-slate-500 w-96 py-1.5 outline-0 border-2 border-slate-700 rounded-sm px-2 font-semibold focus:shadow-lg focus:shadow-slate-800 transition-all hidden sm:block"
        />
        <div className="flex items-center justify-center gap-10">
          {!searchBar ? (
            <Search
              className="sm:hidden size-8 p-1.5 hover:bg-slate-800 cursor-pointer rounded-full"
              onClick={() => setActiveTool("searchbar")}
            />
          ) : null}
          <div className="size-10 rounded-full overflow-hidden cursor-pointer">
            <img
              className="w-full h-full"
              src="https://images.pexels.com/photos/7688554/pexels-photo-7688554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="absolute w-full h-full bg-slate-900 -z-10"></div>
      <div
        className={cn(
          "absolute top-0 opacity-0 -z-20 w-full flex overflow-hidden transition-all duration-200 h-10 sm:hidden",
          {
            "top-full opacity-100": searchBar,
          }
        )}
      >
        <div className="w-full flex">
          <button className="search-bar-icon bg-red-700">
            <X onClick={() => setActiveTool(null)} />
          </button>
          <input
            ref={searchbarRef}
            type="text"
            placeholder="Search your note..."
            className="px-3 py-2 z-auto bg-slate-600 outline-none w-full h-auto"
          />
          <button className="search-bar-icon bg-blue-500">
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
