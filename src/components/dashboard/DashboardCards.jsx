// src/components/DashboardCards.jsx
import CardMetric from "../common/CardMetric";
import {
  MapPin,
  ClipboardList,
  Users,
  AlertTriangle,
  CheckCircle,
  Wrench,
} from "lucide-react";

export default function DashboardCards({ rol, data = {} }) {
  let metrics = [];

  if (rol === "admin") {
  metrics = [
    { title: "Total Lotes", value: data.totalLotes, Icon: MapPin, color: "bg-blue-500" },
    { title: "Tareas Pendientes", value: data.tareasPendientes, Icon: ClipboardList, color: "bg-yellow-500" },
    { title: "Técnicos Activos", value: data.usuariosActivos, Icon: Users, color: "bg-green-500" },
    { title: "Incidencias", value: data.totalIncidencias, Icon: AlertTriangle, color: "bg-red-500" }, 
  ];
  } else if (rol === "supervisor") {
    metrics = [
      { title: "Lotes Supervisados", value: data.lotesSupervisados, Icon: MapPin, color: "bg-blue-500" },
      { title: "Tareas en Proceso", value: data.tareasEnProceso, Icon: ClipboardList, color: "bg-yellow-500" },
      { title: "Tareas Completadas", value: data.tareasCompletadas, Icon: CheckCircle, color: "bg-green-500" },
      { title: "Incidencias Recibidas", value: data.incidenciasRecibidas, Icon: AlertTriangle, color: "bg-red-500" },
    ];
  } else if (rol === "tecnico") {
    metrics = [
      { title: "Tareas Asignadas", value: data.tareasAsignadas, Icon: ClipboardList, color: "bg-blue-500" },
      { title: "Tareas Pendientes", value: data.tareasPendientes, Icon: Wrench, color: "bg-yellow-500" },
      { title: "Tareas Completadas", value: data.tareasCompletadas, Icon: CheckCircle, color: "bg-green-500" },
      { title: "Incidencias Reportadas", value: data.incidenciasReportadas, Icon: AlertTriangle, color: "bg-red-500" },
    ];
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, i) => (
        <CardMetric key={i} {...metric} />
      ))}
    </div>
  );
}
