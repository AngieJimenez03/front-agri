// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
const SOCKET_URL = "http://localhost:5100"; // asegúrate que coincida con tu backend

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) return;

    // ✅ Conexión con el backend y autenticación JWT
    const newSocket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"], // fuerza WebSocket y evita reconexiones innecesarias
    });

    setSocket(newSocket);

    // Cuando se conecta
    newSocket.on("connect", () => {
      console.log("✅ Conectado a Socket.IO como:", user.email);

      // 🔹 Enviamos unión manual a salas según el usuario
      newSocket.emit("joinRoom", {
        rol: user.rol,
        email: user.email,
        lotes: user.lotesAsignados || [],
      });
    });

    // Cuando se desconecta
    newSocket.on("disconnect", () => {
      console.log("❌ Desconectado de Socket.IO");
    });

    // Limpieza cuando se desmonta el componente
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Hook para usar el socket en cualquier componente
export const useSocket = () => useContext(SocketContext);
