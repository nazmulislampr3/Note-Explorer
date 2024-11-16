import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import useAuth from "./hooks/apiHooks/authHooks/useAuth";
import AllNotes from "./pages/AllNotes";
import FavouriteNotes from "./pages/FavouriteNotes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Note from "./pages/Note";
import PInnedNotes from "./pages/PInnedNotes";
import Register from "./pages/Register";
import VerifyRegisterOTP from "./pages/Register/VerifyRegisterOTP";
import Security from "./pages/Security";
import UserInfo from "./pages/UserInfo";
import WriteNote from "./pages/WriteNote";

const App = () => {
  const { loading, session } = useAuth();

  if (loading) {
    return null;
  }

  const authenticated = !!session;

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-700">
      {!authenticated ? (
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register/verify-otp/:token/:key"
              element={<VerifyRegisterOTP />}
            />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<AllNotes />}>
                <Route path="/note/:id" element={<Note />} />
                <Route path="/write-note" element={<WriteNote />} />
              </Route>
              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/security" element={<Security />} />
              <Route path="/notes/favourites" element={<FavouriteNotes />} />
              <Route path="/notes/pinned" element={<PInnedNotes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      )}
    </div>
  );
};

export default App;
