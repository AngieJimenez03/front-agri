// src/components/messages/ChatLot.jsx
import { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatMembers from "./ChatMembers";
import { useSocket } from "../../context/SocketContext";

export default function ChatLote({ lote, mensajesIniciales }) {
  const [mensajes, setMensajes] = useState(mensajesIniciales || []);
  const [mostrarMiembros, setMostrarMiembros] = useState(false);
  const socket = useSocket();
  const user = JSON.parse(localStorage.getItem("user"));
  const scrollRef = useRef(null);

  // actualizar mensajesIniciales si cambian desde padre (fallback HTTP)
  useEffect(() => {
    setMensajes(mensajesIniciales || []);
  }, [mensajesIniciales]);

  // Cuando cambia el lote, unir a la sala y manejar historial + nuevos mensajes
  useEffect(() => {
    if (!lote || !socket) return;

    // Unirse a sala del lote
    socket.emit("unirse_lote", lote._id);

    // Recibir historial
    const onHistorial = (historial) => {
      setMensajes(historial || []);
      // desplazarse al fondo al cargar
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    // Recibir mensajes nuevos
    const onNuevo = (msg) => {
      if (msg.lote === lote._id) {
        setMensajes((prev) => [...prev, msg]);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    socket.on("historial_mensajes", onHistorial);
    socket.on("mensaje_lote", onNuevo);

    return () => {
      socket.off("historial_mensajes", onHistorial);
      socket.off("mensaje_lote", onNuevo);
    };
  }, [lote, socket]);

  if (!lote)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
        Selecciona un lote para comenzar a chatear
      </div>
    );

  // Enviar mensaje
  const handleEnviar = (texto, imagen) => {
    if (!texto && !imagen) return;

    socket?.emit("mensaje_lote", {
  loteId: lote._id,
  texto,
  imagen,
  emisor: {
    id: user._id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
  },
});

    const mensajeOptimista = {
      lote: lote._id,
      emisor: user?.nombre || user?.email || "Tú",
      texto,
      imagen: imagen || null,
      fecha: new Date(),
    };

    setMensajes((prev) => [...prev, mensajeOptimista]);
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="flex flex-col h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-md border border-gray-200">
      {/* Cabecera del chat */}
      <ChatHeader
        loteId={lote._id}
        nombreLote={lote.nombre}
        onToggleMiembros={() => setMostrarMiembros(!mostrarMiembros)}
      />

      {/* Cuerpo del chat */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 p-6 space-y-4 scroll-smooth">
        {mensajes.map((msg, i) => (
          <ChatMessage
            key={i}
            mensaje={{
              usuario: msg.emisor === user?.email || msg.emisor === user?.nombre ? "Tú" : msg.emisor,
              contenido: msg.texto,
              fecha: msg.fecha,
              tipo: msg.emisor === user?.email || msg.emisor === user?.nombre ? "yo" : "otro",
              imagen: msg.imagen || null,
            }}
          />
        ))}
        {/* Referencia para el scroll automático */}
        <div ref={scrollRef} />
      </div>

      {/* Caja de texto */}
      <div className="border-t border-gray-200 bg-white p-3">
        <ChatInput onSend={handleEnviar} />
      </div>

      {/* Panel lateral de miembros */}
      {mostrarMiembros && (
        <aside className="absolute right-0 top-0 h-full w-64 border-l border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out">
          <ChatMembers onClose={() => setMostrarMiembros(false)} />
        </aside>
      )}
    </section>
  );
}
