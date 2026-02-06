import { Routes, Route } from "react-router-dom";
import Login from "./pages/user-login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute, PublicRoute } from "./Protected.jsx";
import HomePage from "./components/HomePage";
import UserDetails from "./components/UserDetails.jsx";
import Status from "./pages/StatusSection/Status.jsx";
import Setting from "./pages/SettingSection/Setting.jsx";
import useUserStore from "./store/useUserStore.js";
import { useEffect } from "react";
import { disconnectSocket, initializeSocket } from "./services/chat.service.js";
import { useChatStore } from "./store/chatStore.js";
const App = () => {
  const { user } = useUserStore();
  const { setCurrentUser, initsocketListners, cleanup } = useChatStore();

  useEffect(() => {
    if (user?._id) {
      const socket = initializeSocket();

      if (socket) {
        setCurrentUser(user);

        initsocketListners();
      }
    }

    return () => {
      cleanup();
      disconnectSocket();
    };
  }, [user, setCurrentUser, initsocketListners, cleanup]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/user-login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-profile" element={<UserDetails />} />
          <Route path="/status" element={<Status />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
