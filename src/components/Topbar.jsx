import { FiPlus } from "react-icons/fi";
import "../styles/dashboard.css";
import { useAuth } from "../hooks/useAuth";

export default function Topbar() {
  const { rol } = useAuth();

  const botonesPorRol = {
    admin: { texto: "Asignar tarea", visible: true },
    supervisor: { texto: "Registrar lote", visible: true },
    tecnico: { texto: "Ver mis tareas", visible: false }, // el técnico no puede crear
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

