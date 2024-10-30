import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useUIContext } from "../context/UIContext";

const Home = () => {
  const { initialize } = useUIContext()!;
  useEffect(() => {
    initialize();
  }, []);
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <Header />
      <div className="w-full flex overflow-y-hidden h-full relative">
        <Sidebar />
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default Home;
