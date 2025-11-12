// src/components/NotificationDropdown.jsx
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/context/SocketContext";
import { useNavigate } from "react-router-dom";

export default function NotificationDropdown() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    if (!socket) return;

    // 🔍 Log para escuchar todos los eventos que llegan desde el backend
    socket.onAny((event, data) => {
      console.log("📡 Evento recibido en frontend:", event, data);
    });

    // 🚨 Evento: alerta de tarea retrasada
    socket.on("alerta_tarea_retrasada", (data) => {
      console.log("🚨 Alerta de tarea retrasada recibida:", data);
      setNotificaciones((prev) => [
        {
          id: Date.now(),
          tipo: "Alerta",
          mensaje: data.mensaje,
          fecha: data.fecha,
          tareaId: data.tareaId,
        },
        ...prev,
      ]);
      setHasNew(true);
    });

    // 🧾 Evento: nueva incidencia
    socket.on("nueva_incidencia", (data) => {
      console.log("📬 Notificación de incidencia recibida:", data);
      setNotificaciones((prev) => [
        {
          id: Date.now(),
          tipo: "Incidencia",
          mensaje: data.mensaje,
          fecha: data.fecha,
          incidenciaId: data.incidenciaId,
        },
        ...prev,
      ]);
      setHasNew(true);
    });

    return () => {
      socket.off("alerta_tarea_retrasada");
      socket.off("nueva_incidencia");
      socket.offAny(); 
    };
  }, [socket]);

  const toggleDropdown = () => {
    setOpen(!open);
    setHasNew(false);
  };

  return (
    <div className="relative">
      {/* Botón de campana */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {hasNew && (
          <motion.span
            className="absolute top-2 right-2 bg-red-500 w-3 h-3 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        )}
      </button>

      {/* Menú desplegable animado */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="p-3 border-b font-semibold text-gray-700 bg-gray-50">
              Notificaciones
            </div>

            <ul className="max-h-80 overflow-y-auto">
              {notificaciones.length === 0 ? (
                <li className="p-3 text-center text-gray-400 text-sm">
                  Sin notificaciones
                </li>
              ) : (
                notificaciones.map((n) => (
                  <motion.li
                    key={n.id}
                    className="p-3 border-b border-gray-100 text-sm hover:bg-gray-50 cursor-pointer transition"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => {
                      console.log(" Click en notificación:", n);
                      if (n.tipo === "Alerta" && n.tareaId)
                        navigate(`/dashboard/tareas/${n.tareaId}`);
                      if (n.tipo === "Incidencia")
                        navigate(`/dashboard/incidencias`);
                      setOpen(false);
                    }}
                  >
                    <p className="font-medium text-gray-800">{n.mensaje}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.fecha}</p>
                  </motion.li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
