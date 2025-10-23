import CardMetric from "./CardMetric";
import { MapPin, ClipboardList, Users, AlertTriangle } from "lucide-react";

export default function DashboardCards() {
  // Datos estáticos de ejemplo
  const metrics = [
    {
      title: "Lotes Activos",
      value: "24",
      Icon: MapPin,
      color: "bg-blue-500",
    },
    {
      title: "Actividades Pendientes",
      value: "8",
      Icon: ClipboardList,
      color: "bg-yellow-500",
    },
    {
      title: "Técnicos en Campo",
      value: "5",
      Icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Incidencias",
      value: "3",
      Icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <CardMetric key={index} {...metric} />
      ))}
    </div>
  );
}
