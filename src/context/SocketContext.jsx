// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
const SOCKET_URL = "http://localhost:5100";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) return;

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: { token },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(` Socket conectado: ${user.email}`);
      newSocket.emit("joinRoom", {
        rol: user.rol,
        email: user.email,
        lotes: user.lotesAsignados || [],
      });
    });

    newSocket.on("connect_error", (err) =>
      console.error(" Error en Socket:", err.message)
    );

    newSocket.on("disconnect", (reason) =>
      console.warn(" Socket desconectado:", reason)
    );

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);