// src/components/DashboardCards.jsx
import CardMetric from "./CardMetric";
import {
  MapPin,
  ClipboardList,
  Users,
  AlertTriangle,
  CheckCircle,
  Wrench,
} from "lucide-react";

export default function DashboardCards({ rol }) {
  let metrics = [];

  if (rol === "admin") {
    metrics = [
      { title: "Total Lotes", value: "24", Icon: MapPin, color: "bg-blue-500" },
      { title: "Tareas Pendientes", value: "8", Icon: ClipboardList, color: "bg-yellow-500" },
      { title: "Técnicos Activos", value: "5", Icon: Users, color: "bg-green-500" },
      { title: "Incidencias", value: "3", Icon: AlertTriangle, color: "bg-red-500" },
    ];
  } else if (rol === "supervisor") {
    metrics = [
      { title: "Lotes Supervisados", value: "12", Icon: MapPin, color: "bg-blue-500" },
      { title: "Tareas en Proceso", value: "5", Icon: ClipboardList, color: "bg-yellow-500" },
      { title: "Tareas Completadas", value: "14", Icon: CheckCircle, color: "bg-green-500" },
      { title: "Incidencias Recibidas", value: "2", Icon: AlertTriangle, color: "bg-red-500" },
    ];
  } else if (rol === "tecnico") {
    metrics = [
      { title: "Tareas Asignadas", value: "10", Icon: ClipboardList, color: "bg-blue-500" },
      { title: "Tareas Pendientes", value: "3", Icon: Wrench, color: "bg-yellow-500" },
      { title: "Tareas Completadas", value: "7", Icon: CheckCircle, color: "bg-green-500" },
      { title: "Incidencias Reportadas", value: "1", Icon: AlertTriangle, color: "bg-red-500" },
    ];
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <CardMetric key={index} {...metric} />
      ))}
    </div>
  );
}
