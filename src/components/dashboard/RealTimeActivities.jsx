// src/components/activities/RealTimeActivities.jsx
import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { Activity } from "lucide-react";

const RealTimeActivities = () => {
  const [actividades, setActividades] = useState([]);
  const socket = useSocket();

  const cargarActividades = async () => {
    try {
      const res = await fetch("http://localhost:5100/api/tasks/actividades", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setActividades(data);
    } catch (e) {
      console.error("Error cargando actividades:", e);
    }
  };

  useEffect(() => {
    cargarActividades();
    if (!socket) return;

    socket.on("tarea_actualizada", (data) => {
      setActividades((prev) => [
        {
          id: data.tareaId,
          titulo: data.titulo,
          estado: data.nuevoEstado,
          fecha: new Date().toISOString(),
        },
        ...prev,
      ]);
    });

    socket.on("tarea_creada", (data) => {
      setActividades((prev) => [
        {
          id: data._id,
          titulo: data.titulo,
          estado: data.estado,
          fecha: new Date().toISOString(),
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("tarea_actualizada");
      socket.off("tarea_creada");
    };
  }, [socket]);

  // 🔹 Formatear fecha corta
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });
  };

  // 🔹 Colores según estado
  const getEstadoColor = (estado) => {
    if (!estado) return "text-gray-500";
    const normalized = estado.toLowerCase().replace(/_/g, " ").trim();
    switch (normalized) {
      case "pendiente":
      case "retrasada":
      case "retraso":
        return "text-red-500"; // 🔴 rojo para pendientes o retrasadas
      case "en proceso":
      case "en revision":
        return "text-amber-500"; // 🟡 amarillo
      case "completada":
      case "resuelta":
        return "text-green-600"; // 🟢 verde
      default:
        return "text-gray-500";
    }
  };

  // 🔹 Mostrar texto con mayúscula inicial
  const formatearEstadoTexto = (estado) => {
    if (!estado) return "Sin estado";
    const texto = estado.replace(/_/g, " ");
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Actividades Recientes
        </h3>
      </div>

      {actividades.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {actividades.slice(0, 6).map((a, i) => (
            <li
              key={i}
              className="flex justify-between items-center py-2 text-sm hover:bg-gray-50 rounded-lg px-2 transition"
            >
              <div>
                <p className="font-medium text-gray-800">{a.titulo}</p>
                <span className={`text-xs font-medium ${getEstadoColor(a.estado)}`}>
                  {formatearEstadoTexto(a.estado)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {formatearFecha(a.fecha)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm text-center py-4">
          No hay actividades recientes.
        </p>
      )}
    </div>
  );
};

export default RealTimeActivities;
