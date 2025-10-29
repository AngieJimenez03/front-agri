// src/components/Lotes/LoteStatusBadge.jsx
export default function LoteStatusBadge({ estado }) {
  const colors = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-100 text-gray-600",
    "IN PROGRESS": "bg-blue-100 text-blue-700",
  };

  const text = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    "IN PROGRESS": "IN PROGRESS",
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[estado] || "bg-gray-100 text-gray-600"}`}>
      {text[estado] || estado}
    </span>
  );
}
