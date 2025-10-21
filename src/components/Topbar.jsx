import { FiPlus } from "react-icons/fi";
import "../styles/dashboard.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Panel Principal</h1>
        <p className="topbar-subtitle">
          Resumen general de operaciones agrícolas
        </p>
      </div>

      <button className="btn-asignar-tarea">
        <FiPlus className="icono-mas" />
        Asignar Tarea
      </button>
    </header>
  );
}
