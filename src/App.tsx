import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import VideoModal from "./components/VideoModal/VideoModal";

function App() {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <>
      <VideoModal />

      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
