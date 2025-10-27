// src/components/Topbar.jsx
import { FiPlus } from "react-icons/fi";
import "../styles/dashboard.css";
import { useAuth } from "../hooks/useAuth";

export default function Topbar() {
  const { rol } = useAuth();

  // ✅ Solo el admin ve el botón y dice "Crear usuario"
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

      {visible && (
        <button className="btn-asignar-tarea">
          <FiPlus className="icono-mas" />
          {texto}
        </button>
      )}
    </header>
  );
}


