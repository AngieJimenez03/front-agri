export default function ActiveProcesses() {
  return (
    <section className="card-section">
      <h2 className="section-title">Procesos Activos</h2>

      <div className="process-list">
        <div className="process-item green">
          <p className="process-name">Riego Lote A-12</p>
          <p className="process-detail">Responsable: Juan Pérez</p>
          <p className="process-progress">Progreso: 30%</p>
        </div>

        <div className="process-item yellow">
          <p className="process-name">Fertilización Lote B-05</p>
          <p className="process-detail">Responsable: María García</p>
          <p className="process-progress">Progreso: 65%</p>
        </div>

        <div className="process-item green">
          <p className="process-name">Cosecha Lote D-02</p>
          <p className="process-detail">Responsable: Pedro Ruiz</p>
          <p className="process-progress">Progreso: 85%</p>
        </div>
      </div>
    </section>
  );
}

