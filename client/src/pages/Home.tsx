import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <Header />
      <div className="w-full flex overflow-y-hidden h-full relative">
        <Sidebar />
        <div className="w-full h-full p-2 overflow-y-auto scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
