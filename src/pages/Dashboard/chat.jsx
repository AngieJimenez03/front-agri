// src/pages/Dashboard/chat.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSocket } from "../../context/SocketContext";
import { useLote } from "../../context/LoteContext";
import ChatLote from "../../components/messages/ChatLot";

export default function ChatPage() {
  const socket = useSocket();
  const { loteActual, setLoteActual } = useLote();
  const [lotes, setLotes] = useState([]);
  const [panelWidth, setPanelWidth] = useState(280);
  const isResizing = useRef(false);
  const token = localStorage.getItem("token");

  // 🔹 Cargar lotes disponibles
  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const res = await axios.get("http://localhost:5100/api/lots", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLotes(res.data);
      } catch (error) {
        console.error("Error al cargar lotes:", error);
      }
    };
    fetchLotes();
  }, [token]);

  // 🔹 Redimensionamiento panel izquierdo
  const startResizing = () => (isResizing.current = true);
  const stopResizing = () => (isResizing.current = false);
  const handleResize = (e) => {
    if (!isResizing.current) return;
    const newWidth = Math.min(Math.max(e.clientX, 220), 480);
    setPanelWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Panel izquierdo */}
        <aside
          className="border-r border-gray-200 bg-white overflow-y-auto"
          style={{ width: `${panelWidth}px` }}
        >
          <h2 className="text-lg font-semibold p-4 border-b text-emerald-700">
            Mis Lotes
          </h2>

          {lotes.length === 0 ? (
            <p className="p-4 text-gray-400 text-sm">
              No tienes lotes asignados
            </p>
          ) : (
            lotes.map((lote) => (
              <div
                key={lote._id}
                onClick={() => setLoteActual(lote)}
                className={`cursor-pointer p-3 border-b hover:bg-emerald-50 transition ${
                  loteActual?._id === lote._id
                    ? "bg-emerald-100 font-semibold"
                    : ""
                }`}
              >
                <p>{lote.nombre || `Lote ${lote._id.slice(-4)}`}</p>
                {lote.cultivo && (
                  <p className="text-xs text-gray-500">
                    Cultivo: {lote.cultivo}
                  </p>
                )}
              </div>
            ))
          )}
        </aside>

        {/* Separador ajustable */}
        <div
          onMouseDown={startResizing}
          className="w-1 cursor-col-resize bg-gray-200 hover:bg-gray-300 transition"
        />

        {/* Panel derecho: Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {loteActual ? (
            <>
              <div className="bg-white border-b px-6 py-3 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-emerald-700">
                    {loteActual.nombre || `Lote ${loteActual._id.slice(-4)}`}
                  </h2>
                  {loteActual.cultivo && (
                    <p className="text-sm text-gray-500">
                      Cultivo: {loteActual.cultivo}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <ChatLote lote={loteActual} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Selecciona un lote para comenzar el chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
