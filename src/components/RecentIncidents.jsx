// src/components/RecentIncidents.jsx
import { AlertCircle } from "lucide-react";

function formatearFecha(fechaISO) {
  if (!fechaISO) return "—";
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentIncidents({ incidencias = [] }) {
  const getBadgeColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pendiente":
      case "abierta":
        return "bg-red-100 text-red-700";
      case "en_revision":
      case "en proceso":
        return "bg-yellow-100 text-yellow-700";
      case "resuelta":
      case "completada":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-amber-500" />
        Últimas Incidencias Reportadas
      </h2>

      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="text-left py-2">Fecha</th>
            <th className="text-left py-2">Título</th>
            <th className="text-left py-2">Lote</th>
            <th className="text-left py-2">Estado</th>
            <th className="text-left py-2">Responsable</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.length > 0 ? (
            incidencias.map((inc) => (
              <tr
                key={inc.id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="py-2 text-gray-600">
                  {formatearFecha(inc.fecha)}
                </td>
                <td className="py-2 font-medium text-gray-800">
                  {inc.titulo || "Sin título"}
                </td>
                <td className="py-2 text-gray-700">
                  {inc.lote || "Sin lote"}
                </td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                      inc.estado
                    )}`}
                  >
                    {inc.estado || "Sin estado"}
                  </span>
                </td>
                <td className="py-2">
                  {inc.responsable || "No asignado"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                Sin incidencias recientes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
