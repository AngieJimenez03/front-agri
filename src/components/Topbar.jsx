// src/components/Topbar.jsx
import { FiPlus } from "react-icons/fi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import "../styles/dashboard.css";
import { useAuth } from "../hooks/useAuth";

export default function Topbar() {
  const { rol } = useAuth();

  const botonesPorRol = {
    admin: { texto: "Crear usuario", visible: true },
    supervisor: { texto: "", visible: false },
    tecnico: { texto: "", visible: false },
  };

  const { texto, visible } = botonesPorRol[rol] || {};

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Panel Principal</h1>
        <p className="topbar-subtitle">
          Resumen general de operaciones agrícolas
        </p>
      </div>

      <div className="topbar-right">
        {/* 🔔 Icono de notificación */}
        <button className="btn-notificacion">
          <HiOutlineBellAlert className="icono-notificacion" />
        </button>

        {visible && (
          <button className="btn-asignar-tarea">
            <FiPlus className="icono-mas" />
            {texto}
          </button>
        )}
      </div>
    </header>
  );
}
