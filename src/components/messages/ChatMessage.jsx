import { User } from "lucide-react";

export default function ChatMessage({ mensaje }) {
  const esYo = mensaje.tipo === "yo";

  const horaFormateada = new Date(mensaje.fecha).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`flex mb-4 ${esYo ? "justify-end" : "justify-start"} items-end`}
    >
      {!esYo && (
        <div className="flex items-start mr-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      )}

      <div
        className={`p-3 rounded-2xl max-w-[70%] shadow-md ${
          esYo
            ? "bg-emerald-600 text-white rounded-br-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {!esYo && (
          <div className="mb-1">
            <p className="text-sm font-semibold text-emerald-700 leading-tight">
              {mensaje.usuario}
            </p>
            {mensaje.rol && (
              <p className="text-xs text-gray-500 -mt-0.5">{mensaje.rol}</p>
            )}
          </div>
        )}

        {mensaje.contenido && (
          <p className="text-sm leading-snug whitespace-pre-wrap">
            {mensaje.contenido}
          </p>
        )}

        {mensaje.imagen && (
          <img
            src={mensaje.imagen}
            alt="mensaje"
            className="mt-2 rounded-lg max-h-48 object-cover shadow-sm"
          />
        )}

        <span
          className={`block text-xs mt-1 ${
            esYo ? "text-emerald-100 text-right" : "text-gray-400"
          }`}
        >
          {horaFormateada}
        </span>
      </div>
    </div>
  );
}
