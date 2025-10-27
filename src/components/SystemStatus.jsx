import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function SystemStatus({ data = {} }) {
  const tareasCompletadas = data.tareasCompletadas || 0;
  const tareasPendientes = data.tareasPendientes || 0;

  const chartData = [
    { name: "Completadas", value: tareasCompletadas },
    { name: "Pendientes", value: tareasPendientes },
  ];

  const COLORS = ["#22c55e", "#facc15"];
  const total = tareasCompletadas + tareasPendientes;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Estado del Sistema
      </h2>
      <div className="flex flex-col items-center">
        <div className="w-full h-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" labelLine={false}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-gray-600 text-sm">
          <strong>{total}</strong> Total de tareas
        </p>
      </div>
    </div>
  );
}
