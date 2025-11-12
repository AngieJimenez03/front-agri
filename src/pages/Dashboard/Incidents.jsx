// src/pages/Dashboard/Incidents.jsx
import { useEffect, useState, useCallback } from "react";
import { getIncidents } from "../../services/incidentsService";
import IncidentGrid from "../../components/incidents/IncidentGrid";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Función reutilizable para cargar incidencias desde el backend
  const fetchData = useCallback(async () => {
    try {
      const data = await getIncidents();
      setIncidents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar incidencias:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Cargar incidencias al montar el componente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔹 Helper: compara ids soportando tanto `id` como `_id`
  const sameId = (obj, id) => {
    if (!obj) return false;
    return (
      obj.id === id ||
      obj._id === id ||
      String(obj.id) === String(id) ||
      String(obj._id) === String(id)
    );
  };

  // 🔹 Refresca desde servidor después de una acción
  const refreshAfterAction = (delay = 700) => {
    setTimeout(() => {
      fetchData();
    }, delay);
  };

  // 🔹 Actualiza una incidencia localmente y luego recarga (EDITAR)
  const handleEdit = (id, updatedData) => {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        sameId(incident, id) ? { ...incident, ...updatedData } : incident
      )
    );

    // 🔁 Espera un poquito y vuelve a cargar los datos desde el servidor
    refreshAfterAction(800);
  };

  // 🔹 Elimina una incidencia localmente y luego recarga (ELIMINAR)
  const handleDelete = (id) => {
    setIncidents((prevIncidents) =>
      prevIncidents.filter((incident) => !sameId(incident, id))
    );

    // 🔁 Espera un poquito y vuelve a cargar desde el servidor
    refreshAfterAction(500);
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">
        Cargando incidencias...
      </div>
    );

  return (
    <div
      className="flex flex-col bg-white shadow-md rounded-2xl h-[calc(100vh-8rem)]
      overflow-hidden border border-gray-100"
    >
      <h2 className="text-xl font-semibold p-5 pb-3 text-gray-800">
        Incidencias registradas
      </h2>

      {/* 🔹 Scroll elegante y sin división visible */}
      <div
        className="flex-1 overflow-y-auto px-6 pb-6
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        hover:scrollbar-thumb-gray-400 transition-all duration-300 ease-in-out"
      >
        <IncidentGrid
          incidents={[...incidents].reverse()}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
