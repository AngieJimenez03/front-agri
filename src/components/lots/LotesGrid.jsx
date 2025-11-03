// src/components/lots/LotesGrid.jsx
import LoteCard from "./LoteCard";

export default function LotesGrid({ lotes, onActualizar, onEditar, onEliminar }) {
  if (!lotes.length)
    return <p className="text-gray-500 text-center">No hay lotes registrados.</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {lotes.map((lote) => (
        <LoteCard
          key={lote._id}
          lote={lote}
          onActualizar={onActualizar}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

