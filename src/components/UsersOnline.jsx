// src/components/UsuariosOnline.jsx
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export default function UsuariosOnline() {
  const socket = useSocket();
  const [online, setOnline] = useState([]);

  useEffect(() => {
    if (!socket) return;


    socket.on("online_users", (list) => setOnline(list));
    socket.emit("request_online_users"); 
    return () => socket.off("online_users");
  }, [socket]);

  if (!online.length) return <p className="text-sm text-gray-400">No hay usuarios en línea</p>;

  return (
    <ul className="space-y-2">
      {online.map((u) => (
        <li key={u.email} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm text-green-700">
            {u.nombre?.charAt(0) || u.email?.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800">{u.nombre || u.email}</div>
            <div className="text-xs text-gray-400">{u.rol}</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500" title="En línea" />
        </li>
      ))}
    </ul>
  );
}
