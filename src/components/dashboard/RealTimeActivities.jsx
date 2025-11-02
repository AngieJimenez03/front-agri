// src/components/activities/RealTimeActivities.jsx
import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";

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
        { id: data.tareaId, titulo: data.titulo, estado: data.nuevoEstado, fecha: new Date().toISOString() },
        ...prev,
      ]);
    });

    socket.on("tarea_creada", (data) => {
      setActividades((prev) => [
        { id: data._id, titulo: data.titulo, estado: data.estado, fecha: new Date().toISOString() },
        ...prev,
      ]);
    });

    return () => {
      socket.off("tarea_actualizada");
      socket.off("tarea_creada");
    };
  }, [socket]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">🕓 Actividades recientes</h3>
      <ul className="space-y-2">
        {actividades.length > 0 ? (
          actividades.map((a, i) => (
            <li key={i}>
              <strong>{a.titulo}</strong> -{" "}
              <span className="text-blue-600">{a.estado}</span>{" "}
              <span className="text-gray-500">({new Date(a.fecha).toLocaleString()})</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay actividades recientes.</p>
        )}
      </ul>
    </div>
  );
};

export default RealTimeActivities;
