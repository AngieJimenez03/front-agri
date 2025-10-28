import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SystemStatus({ data = {} }) {
  // ✅ Extrae valores de forma segura
  const tareasCompletadas = data?.tareasCompletadas || 0;
  const tareasPendientes = data?.tareasPendientes || 0;

  // ✅ Prepara los datos para el gráfico
  const chartData =
    tareasCompletadas === 0 && tareasPendientes === 0
      ? [{ name: "Sin datos", value: 1, color: "#E5E7EB" }] // gris
      : [
          { name: "Completadas", value: tareasCompletadas, color: "#22c55e" },
          { name: "Pendientes", value: tareasPendientes, color: "#facc15" },
        ];

  // ✅ Calcula total solo si hay datos reales
  const total =
    tareasCompletadas + tareasPendientes === 0
      ? "Sin datos"
      : tareasCompletadas + tareasPendientes;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Estado del Sistema</h2>

      <div className="w-full h-[280px] flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        {/* ✅ Texto dinámico debajo */}
        <p className="text-gray-600 text-sm mt-3">
          {total === "Sin datos" ? (
            <span className="text-gray-400">No hay datos disponibles</span>
          ) : (
            <>
              <strong>{total}</strong> total de tareas
            </>
          )}
        </p>
      </div>
    </div>
  );
}

