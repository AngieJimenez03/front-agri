// src/components/navigation/Topbar.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import NotificationDropdown from "../notifications/NotificationDropdown"; // 👈 importa aquí
import "../../styles/dashboard.css";

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");

  const mapRutas = {
    "/dashboard": { titulo: "Panel Principal", subtitulo: "Resumen general de operaciones agrícolas" },
    "/dashboard/lotes": { titulo: "Gestión de Lotes", subtitulo: "Control y supervisión de los lotes activos" },
    "/dashboard/tareas": { titulo: "Gestión de Tareas", subtitulo: "Asigna y gestiona tareas del personal técnico" },
    "/dashboard/usuarios": { titulo: "Gestión de Usuarios", subtitulo: "Administra cuentas y roles del sistema" },
    "/dashboard/incidencias": { titulo: "Gestión de Incidencias", subtitulo: "Monitoreo y seguimiento de reportes" },
    "/dashboard/chat": { titulo: "Chat de Lotes", subtitulo: "Comunicación directa con el personal de campo" },
    "/dashboard/configuracion": { titulo: "Configuración del Sistema", subtitulo: "Ajusta las preferencias del usuario" },
  };

  useEffect(() => {
    const ruta = mapRutas[location.pathname];
    if (ruta) {
      setTitulo(ruta.titulo);
      setSubtitulo(ruta.subtitulo);
    } else {
      setTitulo("Panel");
      setSubtitulo("Bienvenido al sistema");
    }
  }, [location.pathname]);

  return (
    <header
      className="topbar flex justify-between items-center px-6 py-3 shadow-md"
      style={{ backgroundColor: "#4ade80" }}
    >
      <div>
        <h1 className="text-lg font-semibold" style={{ color: "#064e3b" }}>
          {titulo}
        </h1>
        <p className="text-sm opacity-90" style={{ color: "#064e3b" }}>
          {subtitulo}
        </p>
      </div>

      <div className="flex items-center gap-6">
      
        <NotificationDropdown />

        <button
          onClick={() => navigate("/dashboard/perfil")}
          className="text-white hover:opacity-80 transition"
          title="Ver perfil"
        >
          <FaUserCircle size={32} />
        </button>
      </div>
    </header>
  );
}
