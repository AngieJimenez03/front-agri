export default function RealTimeActivities() {
  return (
    <aside className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Actividades en Tiempo Real
      </h2>

      <ul className="space-y-3">
        <li className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600 text-sm">Siembra en curso (Lote A-12)</span>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
            En curso
          </span>
        </li>
        <li className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600 text-sm">Riego completado (Lote B-05)</span>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
            Completado
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Plaga detectada (Lote C-08)</span>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md">
            Alerta
          </span>
        </li>
      </ul>
    </aside>
  );
}
