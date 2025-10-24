import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function SystemStatus() {
  const data = [
    { name: "Completadas", value: 14 },
    { name: "Pendientes", value: 6 },
  ];

  const COLORS = ["#22c55e", "#facc15"]; // verde y amarillo

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Estado del Sistema
      </h2>
      <div className="flex flex-col items-center">
        <div className="w-full h-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-gray-600 text-sm">
          <strong>{total}</strong> Total de Tareas
        </p>
      </div>
    </div>
  );
}
