//src/components/messages/ChatPanel
import { useEffect, useState } from "react";
import { Search, Leaf } from "lucide-react";
import api from "../../services/api";

export default function ChatPanel({ onSelectLote, selectedLote }) {
  const [search, setSearch] = useState("");
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const res = await api.get("/lots");
        setLotes(res.data);
      } catch (error) {
        console.error("Error cargando lotes:", error);
      }
    };
    fetchLotes();
  }, []);

  const filtrados = lotes.filter((l) =>
    l.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="min-w-[280px] max-w-[360px] w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col resize-x overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-semibold text-emerald-800">
          Conversaciones
        </h2>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar lote..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtrados.map((lote) => (
          <div
            key={lote._id}
            onClick={() => onSelectLote(lote)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
              selectedLote === lote._id
                ? "bg-emerald-50 border border-emerald-100"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{lote.nombre}</p>
              <p className="text-sm text-gray-500 truncate">
                {lote.cultivo || "Cultivo desconocido"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
