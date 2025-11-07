// src/components/messages/MessageBubble.jsx
import { User } from "lucide-react";

export default function MessageBubble({ sender, role, text, time, image, isUser }) {
  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar del remitente */}
      {!isUser && (
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 border border-green-300">
          <User size={18} className="text-green-700" />
        </div>
      )}

      {/* Burbuja de mensaje */}
      <div
        className={`relative max-w-[70%] rounded-2xl px-4 py-2 shadow-md ${
          isUser
            ? "bg-green-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
        }`}
      >
        {/* Nombre del remitente (solo si no es el usuario) */}
        {!isUser && <p className="text-xs font-semibold text-green-700 mb-1">{sender}</p>}

        {/* Texto del mensaje */}
        {text && <p className="text-sm leading-snug">{text}</p>}

        {/* Imagen enviada */}
        {image && (
          <img
            src={image}
            alt="imagen-enviada"
            className="mt-2 rounded-lg max-h-48 object-cover shadow-sm"
          />
        )}

        {/* Hora del mensaje */}
        <p
          className={`text-[10px] mt-1 text-right ${
            isUser ? "text-green-100" : "text-gray-400"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}
