// src/components/lots/LotesGrid.jsx
import LoteCard from "./LoteCard";

export default function LotesGrid({ lotes = [] }) {
  if (!lotes.length)
    return (
      <div className="text-center text-gray-500 py-10">
        No lots available yet.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lotes.map((lote) => (
        <LoteCard key={lote._id || lote.nombre} lote={lote} />
      ))}
    </div>
  );
}
