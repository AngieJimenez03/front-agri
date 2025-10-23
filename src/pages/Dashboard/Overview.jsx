// src/pages/Overview.jsx
import DashboardCards from "../../components/DashboardCards";
import "../../styles/dashboard.css";

export default function Overview() {
  const procesosActivos = [
    { nombre: "Riego automatizado", estado: "En curso" },
    { nombre: "Monitoreo del suelo", estado: "Activo" },
  ];

  const actividadesTiempoReal = [
    { mensaje: "Usuario Juan completó la tarea #23" },
    { mensaje: "Nuevo lote registrado en zona norte" },
  ];

  const accionesRapidas = [
    { nombre: "Asignar tarea", color: "#198754" },
    { nombre: "Agregar lote", color: "#0d6efd" },
    { nombre: "Ver reportes", color: "#20c997" },
  ];

  return (
    <div className="overview-container">
      {/* === MÉTRICAS DINÁMICAS === */}
      <DashboardCards />

      {/* === SECCIONES INFERIORES === */}
      <div className="overview-grid">
        {/* === PROCESOS ACTIVOS === */}
        <div className="section">
          <h2>Procesos Activos</h2>
          <ul>
            {procesosActivos.map((p, i) => (
              <li key={i} className="list-item">
                <strong>{p.nombre}</strong>
                <span className="badge">{p.estado}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* === ACTIVIDADES EN TIEMPO REAL === */}
        <div className="section">
          <h2>Actividades en Tiempo Real</h2>
          <ul>
            {actividadesTiempoReal.map((a, i) => (
              <li key={i} className="list-item">{a.mensaje}</li>
            ))}
          </ul>
        </div>

        {/* === ACCIONES RÁPIDAS === */}
        <div className="section">
          <h2>Acciones Rápidas</h2>
          <div className="acciones">
            {accionesRapidas.map((a, i) => (
              <button
                key={i}
                className="btn-accion"
                style={{ backgroundColor: a.color }}
              >
                {a.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
