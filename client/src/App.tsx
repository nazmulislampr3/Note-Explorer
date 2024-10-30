import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

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
            <Route path="/" element={<div>Outlet</div>} />
          </Route>
          <Route path="*" element={<div>404 not found.</div>} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
