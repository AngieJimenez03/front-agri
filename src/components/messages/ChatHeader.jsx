// src/components/messages/ChatHeader.jsx
import { Users, Leaf } from "lucide-react";

export default function ChatHeader({ loteId, onToggleMiembros }) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-100 flex items-center justify-center rounded-full">
          <Leaf className="text-emerald-700 w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Lote {loteId.toUpperCase()}</h3>
          <p className="text-sm text-gray-500">4 miembros activos</p>
        </div>
      </div>
      <button
        onClick={onToggleMiembros}
        className="p-2 hover:bg-gray-100 rounded-lg transition"
        title="Ver miembros"
      >
        <Users className="text-gray-600 w-5 h-5" />
      </button>
    </header>
  );
}
