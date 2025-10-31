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

    // Crear socket
    const newSocket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    // Guardar en estado
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🔌 Conectado a Socket.IO como:", user.email);

      // 🔹 Unir al usuario a las salas según su rol
      if (user.rol === "admin") {
        newSocket.emit("join_room", { room: "admin" });
      } else if (user.rol === "supervisor") {
        newSocket.emit("join_room", { room: `supervisor:${user.email}` });
      } else if (user.rol === "tecnico" && user.lotesAsignados?.length) {
        user.lotesAsignados.forEach((loteId) =>
          newSocket.emit("join_room", { room: `lote:${loteId}` })
        );
      }
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Desconectado de Socket.IO");
    });

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
