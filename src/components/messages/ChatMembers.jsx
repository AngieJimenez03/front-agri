import { X } from "lucide-react";

export default function ChatMembers({ onClose }) {
  const miembros = [
    { nombre: "Ana Gómez", rol: "Agrónoma", online: true },
    { nombre: "Carlos Ruiz", rol: "Operador de Riego", online: true },
    { nombre: "Tú", rol: "Jefe de Cultivo", online: true },
    { nombre: "Marta Soler", rol: "Supervisora", online: false },
  ];

  return (
    <aside className="w-72 border-l border-gray-200 bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Miembros Online</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg"
          title="Cerrar"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {miembros.map((m, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                m.online ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {m.nombre.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-800">{m.nombre}</p>
              <p className="text-sm text-gray-500">{m.rol}</p>
            </div>
            <div
              className={`ml-auto w-2.5 h-2.5 rounded-full ${
                m.online ? "bg-emerald-500" : "bg-gray-300"
              }`}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
