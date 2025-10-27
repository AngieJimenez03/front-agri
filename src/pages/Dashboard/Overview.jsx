import DashboardCards from "../../components/DashboardCards";
import SystemStatus from "../../components/SystemStatus";
import RecentIncidents from "../../components/RecentIncidents";
import ActiveProcesses from "../../components/ActiveProcesses";
import RealTimeActivities from "../../components/RealTimeActivities";
import "../../styles/dashboard.css";
import { useState, useEffect } from "react";
import { obtenerResumen } from "../../services/dashboardService";
import {
  ClipboardList,
  Plus,
  FileText,
  MessageCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export default function Overview() {
  const [rol, setRol] = useState(localStorage.getItem("rol") || "tecnico");
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerResumen();
        if (data) setResumen(data.resumen); // ✅ guarda solo la parte útil
      } catch (error) {
        console.error("Error al obtener resumen:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  if (cargando) return <p className="text-center mt-8">Cargando datos...</p>;
  if (!resumen) return <p className="text-center mt-8">No hay datos disponibles.</p>;

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
      {/* === Tarjetas principales === */}
      <DashboardCards rol={rol} data={resumen.cards} />

      {/* === Panel ADMIN === */}
      {rol === "admin" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <SystemStatus data={resumen.estadoSistema} />
            <div className="lg:col-span-2">
              <RecentIncidents incidencias={resumen.ultimasIncidencias} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Acciones Rápidas</h2>
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

      {/* === Panel SUPERVISOR === */}
      {rol === "supervisor" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <ActiveProcesses processes={resumen.procesosActivos} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Acciones Rápidas</h2>
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
            <RealTimeActivities actividades={resumen.actividadReciente} />
          </div>
        </>
      )}

      {/* === Panel TÉCNICO === */}
      {rol === "tecnico" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <ActiveProcesses processes={resumen.procesosActivos} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Acciones Rápidas</h2>
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
            <RealTimeActivities actividades={resumen.actividadReciente} />
          </div>
        </>
      )}
    </div>
  );
}
