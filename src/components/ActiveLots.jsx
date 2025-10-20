// src/components/LotesActivos.jsx
import { useEffect, useState } from "react";
import { obtenerLotes } from "../services/loteService";
import { useLote } from "../context/LoteContext";
import { Chat } from "lucide-react";

export default function LotesActivos() {
  const { loteActual, setLoteActual } = useLote();
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await obtenerLotes();
        setLotes(data);
      } catch (err) {
        console.error("Error cargando lotes:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Cargando lotes…</div>;

  return (
    <div className="space-y-3">
      {lotes.map((l) => (
        <article
          key={l._id}
          onClick={() => setLoteActual(l)}
          className={`flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border transition cursor-pointer hover:shadow-md ${
            loteActual?._id === l._id ? "ring-2 ring-green-200" : ""
          }`}
        >
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{l.nombre}</h3>
            <p className="text-xs text-gray-500 mt-1">{l.estado || "Sin estado"}</p>
            {typeof l.progreso !== "undefined" && (
              <div className="mt-2 w-48 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-green-500" style={{ width: `${l.progreso}%` }} />
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <button className="p-2 bg-green-50 rounded-md text-green-600 hover:bg-green-100">
              <Chat size={16} />
            </button>
            <span className="text-xs text-gray-400">{l.participantes || ""}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
