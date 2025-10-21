export default function ActiveProcesses() {
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Procesos Activos</h2>

      <div className="space-y-3">
        <div className="border-l-4 border-green-500 pl-3">
          <p className="text-sm font-semibold text-gray-800">Riego Lote A-12</p>
          <p className="text-gray-500 text-sm">Responsable: Juan Pérez</p>
          <p className="text-gray-400 text-xs">Progreso: 30%</p>
        </div>

        <div className="border-l-4 border-yellow-400 pl-3">
          <p className="text-sm font-semibold text-gray-800">Fertilización Lote B-05</p>
          <p className="text-gray-500 text-sm">Responsable: María García</p>
          <p className="text-gray-400 text-xs">Progreso: 65%</p>
        </div>
      </div>
    </section>
  );
}
