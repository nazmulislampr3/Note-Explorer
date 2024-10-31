import { HashRouter, Route, Routes } from "react-router-dom";
import Notes from "./components/Notes";
import FavouriteNotes from "./pages/FavouriteNotes";
import Home from "./pages/Home";
import Security from "./pages/Security";
import UserInfo from "./pages/UserInfo";

const App = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-slate-700">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>404 not found.</div>} />
        </Routes>
      </BrowserRouter> */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Notes />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/security" element={<Security />} />
            <Route path="/notes/favourites" element={<FavouriteNotes />} />
            <Route path="/notes/pinned" element={<FavouriteNotes />} />
          </Route>
          <Route path="*" element={<div>404 not found.</div>} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
