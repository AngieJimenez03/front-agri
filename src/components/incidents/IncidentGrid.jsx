
// src/components/incidents/IncidentGrid.jsx
import React, { useState } from "react";
import IncidentCard from "./IncidentCard";

export default function IncidentGrid({ incidents = [], onEdit, onDelete }) {
  const [filter, setFilter] = useState("todas");

  const filteredIncidents =
    filter === "todas"
      ? incidents
      : incidents.filter((incident) => incident.status === filter);

  if (!incidents.length)
    return (
      <p className="text-gray-500 text-center mt-10">
        No hay incidencias registradas.
      </p>
    );

  return (
    <div className="p-6">
      {/* === FILTROS === */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          { key: "todas", label: "Todas", color: "green" },
          { key: "pendiente", label: "Pendientes", color: "red" },
          { key: "en_revision", label: "En Revisión", color: "yellow" },
          { key: "resuelta", label: "Resueltas", color: "green" },
        ].map((btn) => (
          <button
            key={btn.key}
            className={`px-4 py-2 rounded-full border transition ${
              filter === btn.key
                ? `bg-${btn.color}-600 text-white border-${btn.color}-600`
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setFilter(btn.key)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* === GRID === */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredIncidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}