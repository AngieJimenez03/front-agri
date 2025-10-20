import { useEffect, useState } from "react";
import { obtenerLotes } from "../../services/lotsService";
import { useLote } from "../../context/LoteContext";
import ChatPanel from "../../components/ChatPanel";
import { MessageSquare } from "lucide-react";

export default function Lots() {
  const { loteActual, setLoteActual } = useLote();
  const [lotes, setLotes] = useState([]);
  const [chatAbierto, setChatAbierto] = useState(false);

  useEffect(() => {
    const cargarLotes = async () => {
      try {
        const data = await obtenerLotes();
        setLotes(data);
      } catch (error) {
        console.error("Error al obtener lotes:", error);
      }
    };
    cargarLotes();
  }, []);

  const abrirChat = (lote) => {
    setLoteActual(lote);
    setChatAbierto(true);
  };

  return (
    <div className="flex h-[85vh] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Lista de lotes */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b bg-green-600 text-white font-semibold">
          Lotes activos
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {lotes.length === 0 ? (
            <p className="text-gray-400 text-center mt-3">Sin lotes</p>
          ) : (
            lotes.map((lote) => (
              <div
                key={lote._id}
                onClick={() => abrirChat(lote)}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition ${
                  loteActual?._id === lote._id
                    ? "bg-green-100 border border-green-400"
                    : "hover:bg-gray-100"
                }`}
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {lote.nombre}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {lote.estado || "activo"}
                  </p>
                </div>
                <MessageSquare
                  size={18}
                  className={`${
                    loteActual?._id === lote._id
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Panel solo si está abierto */}
      {chatAbierto && (
        <div className="flex-1">
          <ChatPanel open={chatAbierto} onClose={() => setChatAbierto(false)} />
        </div>
      )}
    </div>
  );
}
