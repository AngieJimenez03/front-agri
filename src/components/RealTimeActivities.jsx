// src/components/RealTimeActivities.jsx
import { Activity, Wrench, Leaf } from "lucide-react";

export default function RealTimeActivities() {
  const activities = [
    {
      id: 1,
      title: "Plaga detectada",
      lote: "C-08",
      time: "Hace 30 min",
      status: "Alerta",
      color: "bg-red-100 text-red-600",
      Icon: Activity,
    },
    {
      id: 2,
      title: "Mantenimiento de equipo",
      lote: "Zona Norte",
      time: "Hace 2 horas",
      status: "En curso",
      color: "bg-blue-100 text-blue-600",
      Icon: Wrench,
    },
    {
      id: 3,
      title: "Fertilización programada",
      lote: "D-15",
      time: "En 30 min",
      status: "Pendiente",
      color: "bg-yellow-100 text-yellow-600",
      Icon: Leaf,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Actividad reciente</h2>
        <span className="text-green-500 text-sm font-medium">● Live</span>
      </div>

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
                <p className="text-xs text-gray-500">{lote} • {time}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

