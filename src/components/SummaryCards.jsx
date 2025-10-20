// src/components/SummaryCards.jsx
import CardMetric from "./CardMetric";

export default function SummaryCards({ rol, data = {} }) {
  const cards =
    rol === "admin"
      ? [
          { title: "Lotes activos", value: data.lotes || "—" },
          { title: "Tareas en curso", value: data.tareas || "—" },
          { title: "Incidencias", value: data.incidencias || "—" },
          { title: "Usuarios", value: data.usuarios || "—" },
        ]
      : rol === "supervisor"
      ? [
          { title: "Mis Lotes", value: data.lotes || "—" },
          { title: "Tareas activas", value: data.tareas || "—" },
          { title: "Incidencias en mis lotes", value: data.incidencias || "—" },
        ]
      : [
          { title: "Mis Tareas", value: data.misTareas || "—" },
          { title: "Pendientes", value: data.pendientes || "—" },
          { title: "Completadas", value: data.completadas || "—" },
        ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {cards.map((c, i) => (
        <CardMetric key={i} title={c.title} value={c.value} />
      ))}
    </div>
  );
}
