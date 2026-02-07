// import { io } from "socket.io-client";
// import useUserStore from "../store/useUserStore";

// let socket = null;

// const token = localStorage.getItem("auth_token");

// export const initializeSocket = () => {
//   if (socket) return socket;

//   const user = useUserStore.getState().user;
//   const BACKEND_URL = import.meta.env.VITE_API_URL;
//   socket = io(BACKEND_URL, {
//     auth: { token },
//     // withCredentials: true,
//     transports: ["websocket", "polling"],
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000,
//   });

//   //   connection events
//   socket.on("connect", () => {
//     console.log("socket connected", socket.id);
//     socket.emit("user_connected", user._id);
//   });

//   socket.on("connect_error", (error) => {
//     console.log("socket connection error", error);
//   });

//   //   disconnected event
//   socket.on("disconnect", (reason) => {
//     console.log("socket disconnected", reason);
//   });

//   return socket;
// };

// export const getSocket = () => {
//   if (!socket) {
//     return initializeSocket();
//   }
//   return socket;
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

// src/services/socket.service.js
import { io } from "socket.io-client";
import useUserStore from "../store/useUserStore";

let socket = null;

export const initializeSocket = () => {
  // If socket already exists, return it
  if (socket) return socket;

  // Get token dynamically from localStorage
  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.log("Socket not initialized: no auth token found");
    return null;
  }

  // Get current user from Zustand store
  const user = useUserStore.getState().user;

  // Backend URL (HTTPS in production)
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  // Initialize Socket.IO client
  socket = io(BACKEND_URL, {
    auth: { token }, // send JWT token to backend
    transports: ["websocket", "polling"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // Connection established
  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);

    // Emit user_connected only if user exists
    if (user?._id) {
      socket.emit("user_connected", user._id);
    }
  });

  // Connection error
  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });

  // Disconnected
  socket.on("disconnect", (reason) => {
    console.log("⚠️ Socket disconnected:", reason);
  });

  return socket;
};

// Get the socket instance safely
export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🛑 Socket disconnected manually");
  }
};
