export default function StatusBadge({ status }) {
  const colors = {
    "En curso": "bg-blue-100 text-blue-700",
    "Activo": "bg-green-100 text-green-700",
    "Retrasado": "bg-red-100 text-red-700",
    "Completado": "bg-gray-200 text-gray-800",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${colors[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}
