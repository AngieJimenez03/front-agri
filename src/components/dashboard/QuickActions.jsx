// src/components/QuickActions.jsx
import { Plus, ClipboardList, BarChart3 } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { name: "Assign Task", Icon: ClipboardList, color: "bg-emerald-500" },
    { name: "Add Lot", Icon: Plus, color: "bg-blue-500" },
    { name: "View Reports", Icon: BarChart3, color: "bg-teal-500" },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        {actions.map(({ name, Icon, color }, i) => (
          <button
            key={i}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium hover:opacity-90 transition ${color}`}
          >
            <Icon className="w-4 h-4" />
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
