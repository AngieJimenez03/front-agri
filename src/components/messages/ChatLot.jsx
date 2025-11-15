// src/components/messages/ChatLot.jsx
import { useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useSocket } from "../../context/SocketContext";

export default function ChatLote({ lote, mensajesIniciales = [] }) {
  const socket = useSocket();
  const user = JSON.parse(localStorage.getItem("user"));
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [cargando, setCargando] = useState(true);
  const scrollRef = useRef(null);

  // 🔹 Auto scroll al final
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes]);

  // 🔹 Unirse al canal del lote y escuchar eventos en tiempo real
  useEffect(() => {
    if (!socket || !lote?._id) return;

    const joinLote = () => {
      setCargando(true);
      socket.emit("unirse_lote", lote._id);
    };

    // 🔹 Unirse inmediatamente si el socket ya está conectado
    if (socket.connected) joinLote();

    // 🔹 Unirse también cuando el socket se reconecta
    socket.on("connect", joinLote);

    // 🔹 Manejar historial de mensajes
    const handleHistorial = (historial) => {
      const formateados = (historial || []).map((m) => ({
        _id: m._id,
        usuario: m.emisor,
        rol: m.rol,
        contenido: m.texto,
        imagen: m.imagen,
        fecha: m.fecha,
        tipo:
          m.emisor === user?.nombre || m.emisor === user?.email ? "yo" : "otro",
      }));
      setMensajes(formateados);
      setCargando(false);
    };

    // Escuchar historial
    socket.on("historial_mensajes", handleHistorial);

    // 🔹 Escuchar nuevos mensajes en tiempo real
    const handleNuevoMensaje = (nuevo) => {
      if (!nuevo?.lote?._id || nuevo.lote._id !== lote._id) return;

      const mensajeFormateado = {
        _id: nuevo._id,
        usuario: nuevo.emisor,
        rol: nuevo.rol,
        contenido: nuevo.texto,
        imagen: nuevo.imagen,
        fecha: nuevo.fecha,
        tipo:
          nuevo.emisor === user?.nombre || nuevo.emisor === user?.email
            ? "yo"
            : "otro",
      };

      setMensajes((prev) => [...prev, mensajeFormateado]);
    };

    socket.on("mensaje_lote", handleNuevoMensaje);

    return () => {
      socket.off("connect", joinLote);
      socket.off("historial_mensajes", handleHistorial);
      socket.off("mensaje_lote", handleNuevoMensaje);
    };
  }, [socket, lote?._id, user?.nombre, user?.email]);

  // 🔹 Enviar mensaje
  const handleSend = (texto, imagen) => {
    if (!socket || (!texto && !imagen)) return;

    socket.emit("mensaje_lote", {
      loteId: lote._id,
      texto,
      imagen,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Área de mensajes */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {cargando ? (
          <p className="text-center text-gray-400 text-sm mt-6">
            Cargando mensajes...
          </p>
        ) : mensajes.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-6">
            No hay mensajes todavía
          </p>
        ) : (
          mensajes.map((msg) => (
            <ChatMessage key={msg._id || Math.random()} mensaje={msg} />
          ))
        )}
      </div>

      {/* Input para escribir */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
