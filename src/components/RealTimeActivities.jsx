export default function RealTimeActivities() {
  return (
    <aside className="card-section">
      <h2 className="section-title">Actividades en Tiempo Real</h2>

      <ul className="activity-list">
        <li className="activity-item">
          <span>Siembra en curso (Lote A-12)</span>
          <span className="badge blue">En curso</span>
        </li>
        <li className="activity-item">
          <span>Riego completado (Lote B-05)</span>
          <span className="badge green">Completado</span>
        </li>
        <li className="activity-item">
          <span>Plaga detectada (Lote C-08)</span>
          <span className="badge red">Alerta</span>
        </li>
      </ul>
    </aside>
  );
}

