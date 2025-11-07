// src/components/messages/ChatLot.jsx
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatMembers from "./ChatMembers";

export default function ChatLote({ loteId }) {
  const [mostrarMiembros, setMostrarMiembros] = useState(false);

  if (!loteId)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50 border-l border-gray-200">
        Selecciona un lote para comenzar a chatear
      </div>
    );

  const mensajes = [
    {
      _id: 1,
      usuario: "Juan Pérez",
      contenido: "Buenos días equipo, iniciaré el riego en 30 minutos.",
      fecha: new Date(),
      tipo: "otro",
    },
    {
      _id: 2,
      usuario: "Tú",
      contenido:
        "Perfecto Juan, recuerda revisar la presión del sistema antes de comenzar.",
      fecha: new Date(),
      tipo: "yo",
    },
    {
      _id: 3,
      usuario: "María García",
      contenido:
        "He notado que la humedad está en 65%, dentro del rango óptimo.",
      fecha: new Date(),
      tipo: "otro",
    },
  ];

  return (
    <section className="flex flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Panel principal */}
      <div className="flex flex-col flex-1">
        <ChatHeader
          loteId={loteId}
          onToggleMiembros={() => setMostrarMiembros(!mostrarMiembros)}
        />

        {/* Contenedor de mensajes */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 p-6 space-y-4">
          {mensajes.map((msg) => (
            <ChatMessage key={msg._id} mensaje={msg} />
          ))}
        </div>

        <div className="border-t border-gray-200 bg-white p-3">
          <ChatInput />
        </div>
      </div>

      {/* Panel lateral de miembros */}
      {mostrarMiembros && (
        <aside className="w-64 border-l border-gray-200 bg-white transition-all duration-300 ease-in-out">
          <ChatMembers onClose={() => setMostrarMiembros(false)} />
        </aside>
      )}
    </section>
  );
}
