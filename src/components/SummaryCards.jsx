export default function SummaryCards() {
  const data = [
    { titulo: "Lotes Activos", valor: 24, variacion: "+3", color: "green" },
    { titulo: "Tareas Pendientes", valor: 18, variacion: "-5", color: "yellow" },
    { titulo: "Técnicos en Campo", valor: 12, variacion: "+2", color: "blue" },
    { titulo: "Incidencias Críticas", valor: 3, variacion: "-1", color: "red" },
  ];

  return (
    <section className="summary-cards">
      {data.map((item, i) => (
        <div key={i} className={`card ${item.color}`}>
          <h4>{item.titulo}</h4>
          <h2>{item.valor}</h2>
          <span>{item.variacion}</span>
        </div>
      ))}
    </section>
  );
}
