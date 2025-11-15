// src/components/NotificationDropdown.jsx
import { useEffect, useState } from "react";
import { Bell, AlertCircle, Info, Clock } from "lucide-react";
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

    socket.onAny((event, data) => {
      console.log("📡 Evento recibido en frontend:", event, data);
    });

    // 🚨 Alerta de tarea retrasada
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

    // 🧾 Nueva incidencia
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

  // 🎨 Colores y estilos según el tipo de notificación
  const getTypeStyles = (tipo) => {
    switch (tipo) {
      case "Alerta":
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          border: "border-l-4 border-red-400",
          bg: "bg-red-50 hover:bg-red-100/70",
        };
      case "Incidencia":
        return {
          icon: <Info className="w-5 h-5 text-orange-500" />,
          border: "border-l-4 border-orange-400",
          bg: "bg-orange-50 hover:bg-orange-100/70",
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-500" />,
          border: "border-l-4 border-blue-400",
          bg: "bg-blue-50 hover:bg-blue-100/70",
        };
    }
  };

  // ⏰ Formato de fecha legible (sin segundos, sin cero delante)
  const formatDate = (dateStr) => {
    if (!dateStr) return "Sin fecha";

    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;

    const fecha = date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const hora = date.toLocaleTimeString("es-CO", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${fecha} • ${hora}`;
  };

  return (
    <div className="relative">
      {/* 🔔 Botón de campana */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {hasNew && (
          <motion.span
            className="absolute top-2 right-2 bg-red-500 w-3 h-3 rounded-full shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 350 }}
          />
        )}
      </button>

      {/* 📜 Menú de notificaciones */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Encabezado */}
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <span className="font-semibold text-gray-800 text-sm">
                Notificaciones
              </span>
              {notificaciones.length > 0 && (
                <span className="text-xs text-gray-500">
                  {notificaciones.length} nuevas
                </span>
              )}
            </div>

            {/* Lista */}
            <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {notificaciones.length === 0 ? (
                <li className="p-5 text-center text-gray-400 text-sm">
                  Sin notificaciones recientes
                </li>
              ) : (
                notificaciones.map((n) => {
                  const { icon, border, bg } = getTypeStyles(n.tipo);
                  return (
                    <motion.li
                      key={n.id}
                      className={`flex items-start gap-3 p-4 cursor-pointer transition-all duration-200 ${border} ${bg}`}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => {
                        if (n.tipo === "Alerta" && n.tareaId)
                          navigate(`/dashboard/tareas/${n.tareaId}`);
                        if (n.tipo === "Incidencia")
                          navigate(`/dashboard/incidencias`);
                        setOpen(false);
                      }}
                    >
                      <div className="mt-1">{icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm leading-snug">
                          {n.mensaje}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(n.fecha)}</span>
                        </div>
                      </div>
                    </motion.li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
