import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUIContext } from "../context/UIContext";
import cn from "../utils/cn";

const Header = () => {
  const { activeTool, setActiveTool } = useUIContext()!;
  const searchBar = activeTool === "searchbar";
  const searchbarRef = useRef<any>(null);
  const searchBtnRef = useRef<any>(null);
  const searchBtnSmRef = useRef<any>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {};

  useEffect(() => {
    if (searchBar) {
      searchbarRef.current.focus();
    }
  }, [activeTool]);

  return (
    <div className="shadow-sm shadow-slate-800 flex flex-col justify-center py-2 relative header bg-slate-900 z-50">
      <div className={cn("px-5 flex items-center justify-between gap-5")}>
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
        <div className="hidden sm:flex bg-slate-800 rounded-full rounded-r-full overflow-hidden pl-3">
          {/* <div className="w-52 bg-green-300"></div> */}
          <input
            type="text"
            className="outline-0 w-96 px-3 py-2 bg-transparent"
            placeholder="Search your notes here..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onKeyUp={(e) => e.key === "Enter" && searchBtnSmRef.current.click()}
          />
          <div className="size-12 flex-shrink-0 flex items-center justify-center relative">
            <button
              className={cn(
                " bg-blue-500 size-4/5 rounded-full absolute transition-all duration-200 -translate-x-0 -translate-y-1/2 top-1/2 left-full",
                {
                  "left-1/2 -translate-x-1/2": searchValue,
                }
              )}
              ref={searchBtnSmRef}
              onClick={handleSearch}
            >
              <Search className="m-auto size-3/5" />
            </button>
          </div>
        </div>
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
            <X
              onClick={() => {
                setActiveTool(null);
                setSearchValue("");
              }}
            />
          </button>
          <input
            ref={searchbarRef}
            type="text"
            placeholder="Search your note..."
            className="px-3 py-2 z-auto bg-slate-600 outline-none w-full h-auto"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onKeyUp={(e) => e.key === "Enter" && searchBtnRef.current.click()}
          />
          <button className="search-bar-icon bg-blue-500" ref={searchBtnRef}>
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
