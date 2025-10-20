import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useLote } from "../context/LoteContext";

export default function ChatLote() {
  const socket = useSocket();
  const { loteActual } = useLote();
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!socket || !loteActual) return;

    socket.emit("unirse_lote", loteActual._id);

    socket.on("mensaje_lote", (msg) => {
      if (msg.loteId === loteActual._id) {
        setMensajes((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("mensaje_lote");
  }, [socket, loteActual]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!texto.trim() || !loteActual) return;

    const msg = {
      texto,
      loteId: loteActual._id,
      emisor: user.nombre || "Usuario",
      fecha: new Date().toLocaleTimeString(),
    };

    socket.emit("mensaje_lote", msg);
    setMensajes((prev) => [...prev, msg]);
    setTexto("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {mensajes.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] ${
              msg.emisor === user.nombre ? "ml-auto text-right" : ""
            }`}
          >
            <div
              className={`p-3 rounded-2xl ${
                msg.emisor === user.nombre
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="text-xs font-semibold">{msg.emisor}</div>
              <div className="text-sm">{msg.texto}</div>
              <div className="text-[10px] text-gray-300">{msg.fecha}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={enviarMensaje} className="flex mt-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder={`Mensaje en ${loteActual?.nombre || ""}...`}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
