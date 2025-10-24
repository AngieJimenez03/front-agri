// src/components/RoleSection.jsx
export default function RoleSection({ role }) {
  if (role === "admin")
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Tareas Recientes" items={["Riego automatizado", "Monitoreo de pH", "Limpieza de estanques"]} />
        <Section title="Incidencias Activas" items={["Sensor de humedad fallando", "Bomba sin presión"]} />
      </div>
    );

  if (role === "supervisor")
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Tareas por Técnico" items={["Juan - 3 tareas", "Ana - 5 tareas", "Carlos - 2 tareas"]} />
        <Section title="Incidencias en Zona" items={["Falla eléctrica - Norte", "Obstrucción - Este"]} />
      </div>
    );

  if (role === "tecnico")
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Mis Tareas" items={["Revisión de válvulas", "Medición de oxígeno"]} />
        <Section title="Mis Incidencias" items={["Fuga detectada", "Sensor sin señal"]} />
      </div>
    );
}

function Section({ title, items }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <ul className="text-sm text-gray-600 space-y-1">
        {items.map((item, i) => (
          <li key={i} className="border-b border-gray-100 pb-1">{item}</li>
        ))}
      </ul>
    </div>
  );
}
