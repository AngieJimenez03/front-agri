import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Activity, Wrench, Leaf } from "lucide-react";

export default function RealTimeActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ 1. Cargar datos persistentes del backend
    fetch("http://localhost:5100/api/tareas/actividades", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const parsed = data.map((t) => ({
          id: t.id,
          title: t.titulo,
          lote: t.lote,
          time: new Date(t.fecha).toLocaleTimeString(),
          status: t.estado,
          color:
            t.estado === "pendiente"
              ? "bg-yellow-100 text-yellow-600"
              : t.estado === "en_proceso"
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600",
          Icon: Activity,
        }));
        setActivities(parsed);
      })
      .catch((err) => console.error("Error cargando actividades:", err));

    // ✅ 2. Conectarse al Socket.IO
    const socket = io("http://localhost:5100", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Conectado a Socket.IO", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión Socket.IO:", err.message);
    });

    // ✅ 3. Escuchar eventos en tiempo real
    socket.on("notificacion_tarea", (data) => {
      setActivities((prev) => [
        {
          id: Date.now(),
          title: data.mensaje,
          lote: data.tarea?.lote?.nombre || "Lote desconocido",
          time: new Date().toLocaleTimeString(),
          status: "Nueva tarea",
          color: "bg-blue-100 text-blue-600",
          Icon: Wrench,
        },
        ...prev.slice(0, 9),
      ]);
    });

    socket.on("tarea_actualizada", (data) => {
      setActivities((prev) => [
        {
          id: Date.now(),
          title: data.mensaje,
          lote: `Lote ID ${data.loteId}`,
          time: new Date().toLocaleTimeString(),
          status: data.nuevoEstado,
          color: "bg-green-100 text-green-600",
          Icon: Activity,
        },
        ...prev.slice(0, 9),
      ]);
    });

    socket.on("nueva_incidencia", (data) => {
      setActivities((prev) => [
        {
          id: Date.now(),
          title: data.mensaje || data.descripcion,
          lote: data.loteId,
          time: new Date().toLocaleTimeString(),
          status: "Incidencia",
          color: "bg-red-100 text-red-600",
          Icon: Leaf,
        },
        ...prev.slice(0, 9),
      ]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Actividad reciente
        </h2>
        <span className="text-green-500 text-sm font-medium">● Live</span>
      </div>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          Sin actividad reciente
        </p>
      ) : (
        <div className="space-y-3">
          {activities.map(({ id, title, lote, time, status, color, Icon }) => (
            <div
              key={id}
              className="p-3 border border-gray-200 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">{title}</p>
                  <p className="text-xs text-gray-500">
                    {lote} • {time}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
