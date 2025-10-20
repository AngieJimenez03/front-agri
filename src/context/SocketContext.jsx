import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const newSocket = io("http://localhost:5100", {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log(" Conectado al servidor Socket.IO");
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
