// src/pages/dashboard/Overview.jsx
import DashboardCards from "../../components/DashboardCards";
import SystemStatus from "../../components/SystemStatus";
import RecentIncidents from "../../components/RecentIncidents";
import ActiveProcesses from "../../components/ActiveProcesses";
import RealTimeActivities from "../../components/RealTimeActivities";
import "../../styles/dashboard.css";
import { useState } from "react";
import {
  ClipboardList,
  Plus,
  FileText,
  MessageCircle,
  CalendarDays,
  AlertTriangle,
  RefreshCw,
  Wrench,
} from "lucide-react";

export default function Overview() {
  const [rol, setRol] = useState("admin");

  // === Tareas activas por rol ===
  const procesosPorRol = {
    supervisor: [
      {
        id: 1,
        name: "Aplicación de Fertilizante",
        area: "Lote 3B",
        responsable: "Carlos M.",
        date: "23/10/2025",
        progress: 60,
        status: "En proceso",
      },
      {
        id: 2,
        name: "Monitoreo de Plaga",
        area: "Lote 7A",
        responsable: "Ana L.",
        date: "22/10/2025",
        progress: 0,
        status: "Pendiente",
      },
      {
        id: 3,
        name: "Riego del Lote 5A",
        area: "Zona Norte",
        responsable: "Pedro G.",
        date: "21/10/2025",
        progress: 25,
        status: "En proceso",
      },
    ],
    tecnico: [
      {
        id: 1,
        name: "Aplicación de Fertilizante",
        area: "Lote 3B",
        responsable: "Carlos M.",
        date: "23/10/2025",
        progress: 60,
        status: "En proceso",
      },
      {
        id: 2,
        name: "Monitoreo de Plaga",
        area: "Lote 7A",
        responsable: "Carlos M.",
        date: "22/10/2025",
        progress: 0,
        status: "Pendiente",
      },
      {
        id: 3,
        name: "Riego del Lote",
        area: "Lote 5A",
        responsable: "Carlos M.",
        date: "21/10/2025",
        progress: 100,
        status: "Completada",
      },
    ],
  };

  // === Acciones rápidas por rol con iconos ===
  const accionesPorRol = {
    admin: [
      { nombre: "Registrar lote", color: "#0d6efd", Icon: Plus },
      { nombre: "Asignar tarea", color: "#198754", Icon: ClipboardList },
      { nombre: "Ver reportes", color: "#6f42c1", Icon: FileText },
      { nombre: "Enviar mensaje", color: "#20c997", Icon: MessageCircle },
    ],
    supervisor: [
      { nombre: "Asignar nueva tarea", color: "#198754", Icon: ClipboardList },
      { nombre: "Revisar incidencias", color: "#6c757d", Icon: AlertTriangle },
      { nombre: "Actualizar estado de lote", color: "#0d6efd", Icon: RefreshCw },
    ],
    tecnico: [
      { nombre: "Actualizar tarea", color: "#198754", Icon: RefreshCw },
      { nombre: "Reportar incidencia", color: "#dc3545", Icon: AlertTriangle },
      { nombre: "Ver mis tareas", color: "#0d6efd", Icon: ClipboardList },
    ],
  };

  return (
    <div className="overview-container">
      {/* === Selector de Rol (solo para pruebas, puedes quitarlo después) === */}
      <div className="mb-4 flex justify-end">
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="border rounded-lg p-2 text-sm bg-white shadow-sm"
        >
          <option value="admin">Administrador</option>
          <option value="supervisor">Supervisor</option>
          <option value="tecnico">Técnico</option>
        </select>
      </div>

      {/* === Tarjetas principales === */}
      <DashboardCards rol={rol} />

      {/* === Panel Admin === */}
      {rol === "admin" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <SystemStatus />
            <div className="lg:col-span-2">
              <RecentIncidents />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Acciones Rápidas
            </h2>
            <div className="flex flex-wrap gap-3">
              {accionesPorRol.admin.map(({ nombre, color, Icon }, i) => (
                <button
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow hover:opacity-90 transition"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-4 h-4" />
                  {nombre}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* === Panel Supervisor === */}
      {rol === "supervisor" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <ActiveProcesses processes={procesosPorRol.supervisor} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Acciones Rápidas
              </h2>
              <div className="flex flex-col gap-3">
                {accionesPorRol.supervisor.map(({ nombre, color, Icon }, i) => (
                  <button
                    key={i}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow hover:opacity-90 transition"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="w-4 h-4" />
                    {nombre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <RealTimeActivities />
          </div>
        </>
      )}

      {/* === Panel Técnico === */}
      {rol === "tecnico" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <ActiveProcesses processes={procesosPorRol.tecnico} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Acciones Rápidas
              </h2>
              <div className="flex flex-col gap-3">
                {accionesPorRol.tecnico.map(({ nombre, color, Icon }, i) => (
                  <button
                    key={i}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow hover:opacity-90 transition"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="w-4 h-4" />
                    {nombre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <RealTimeActivities />
          </div>
        </>
      )}
    </div>
  );
}
