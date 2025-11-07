//src/components/messages/ChatPanel
import { useState } from "react";
import { Search, Leaf } from "lucide-react";

export default function ChatPanel({ onSelectLote, selectedLote }) {
  const [search, setSearch] = useState("");

  const conversaciones = [
    {
      _id: "lote1",
      nombre: "Lote Norte A",
      cultivo: "Maíz",
      ultimoMensaje: "Riego completado exitosamente",
      hora: "09:45",
    },
    {
      _id: "lote2",
      nombre: "Lote Sur B",
      cultivo: "Trigo",
      ultimoMensaje: "Necesitamos revisar las válvulas",
      hora: "08:30",
    },
    {
      _id: "lote3",
      nombre: "Lote Experimental C",
      cultivo: "Soya",
      ultimoMensaje: "Preparando terreno para siembra",
      hora: "Ayer",
    },
  ];

  const filtrados = conversaciones.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
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

      {/* Lista de conversaciones */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtrados.map((conv) => (
          <div
            key={conv._id}
            onClick={() => onSelectLote(conv._id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
              selectedLote === conv._id
                ? "bg-emerald-50 border border-emerald-100"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">
                {conv.nombre}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {conv.ultimoMensaje}
              </p>
            </div>
            <span className="text-xs text-gray-400">{conv.hora}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
