import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useLote } from "../context/LoteContext";
import { Send } from "lucide-react";

export default function ChatPanel({ open, onClose }) {
  const socket = useSocket();
  const { loteActual } = useLote();
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const scrollRef = useRef();

  const usuario = JSON.parse(localStorage.getItem("user") || "{}");
  const usuarioActual = usuario?.nombre || "Usuario";

  // Unirse al lote
  useEffect(() => {
    if (socket && loteActual?._id) {
      setMensajes([]);
      socket.emit("unirse_lote", loteActual._id);
      console.log(` unido al lote ${loteActual._id}`);
    }
  }, [socket, loteActual]);

  // Escuchar mensajes nuevos
  useEffect(() => {
    if (!socket) return;
    const recibirMensaje = (msg) => {
      if (msg.loteId === loteActual?._id) {
        setMensajes((prev) => [...prev, msg]);
      }
    };
    socket.on("mensaje_lote", recibirMensaje);
    return () => socket.off("mensaje_lote", recibirMensaje);
  }, [socket, loteActual]);

  // Scroll automático
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [mensajes]);

  // Enviar mensaje
  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!texto.trim() || !loteActual || !socket) return;

    const msg = {
      loteId: loteActual._id,
      texto: texto.trim(),
      emisor: usuarioActual,
      fecha: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("mensaje_lote", msg);
    setMensajes((prev) => [...prev, msg]); // mostrar sin duplicar
    setTexto("");
  };

  if (!open || !loteActual) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[420px] h-[520px] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="p-3 bg-green-600 text-white flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold">{loteActual.nombre}</h2>
          <p className="text-[11px] text-green-100">
            {loteActual.ubicacion || "Chat del lote"}
          </p>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ✕
        </button>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
        {mensajes.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 text-sm">
            No hay mensajes aún
          </p>
        ) : (
          mensajes.map((m, i) => {
            const propio = m.emisor === usuarioActual;
            return (
              <div key={i} className={`flex ${propio ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    propio
                      ? "bg-green-600 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <div className="text-xs font-semibold mb-1 opacity-80">
                    {propio ? "Tú" : m.emisor}
                  </div>
                  <div>{m.texto}</div>
                  <div
                    className={`text-[10px] mt-1 ${
                      propio ? "text-gray-200" : "text-gray-500"
                    }`}
                  >
                    {m.fecha}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={enviarMensaje}
        className="p-3 bg-gray-100 border-t border-gray-200 flex gap-2 items-center"
      >
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
