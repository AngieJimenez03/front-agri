import { AlertCircle } from "lucide-react";

export default function RecentIncidents() {
  const incidencias = [
    {
      fecha: "2025-10-22",
      lote: "Lote 05-A",
      estado: "Abierta",
      responsable: "Carlos Ruiz",
    },
    {
      fecha: "2025-10-21",
      lote: "Lote 07-C",
      estado: "En proceso",
      responsable: "Ana Gómez",
    },
    {
      fecha: "2025-10-20",
      lote: "Lote 02-B",
      estado: "Resuelta",
      responsable: "Laura Méndez",
    },
  ];

  const getBadgeColor = (estado) => {
    switch (estado) {
      case "Abierta":
        return "bg-red-100 text-red-700";
      case "En proceso":
        return "bg-yellow-100 text-yellow-700";
      case "Resuelta":
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
            <th className="text-left py-2">Lote</th>
            <th className="text-left py-2">Estado</th>
            <th className="text-left py-2">Responsable</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.map((inc, i) => (
            <tr
              key={i}
              className="border-b last:border-0 hover:bg-gray-50 transition"
            >
              <td className="py-2">{inc.fecha}</td>
              <td className="py-2 font-medium text-gray-800">{inc.lote}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                    inc.estado
                  )}`}
                >
                  {inc.estado}
                </span>
              </td>
              <td className="py-2">{inc.responsable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
