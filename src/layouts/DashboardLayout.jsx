// src/layouts/DashboardLayout.jsx
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ChatPanel from "../components/ChatPanel";
import { obtenerLotes } from "../services/lotsService";
import { useLote } from "../context/LoteContext";
import { MessageSquare } from "lucide-react";

export default function DashboardLayout() {
  const rol = localStorage.getItem("rol") || "tecnico";
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();
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

  // cerrar chat si se sale de la vista de dashboard
  useEffect(() => {
    if (!location.pathname.startsWith("/dashboard")) {
      setChatAbierto(false);
      setLoteActual(null);
    }
  }, [location, setLoteActual]);

  const abrirChat = (lote) => {
    setLoteActual(lote);
    setChatAbierto(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-50 via-white to-green-100">
      {/* Sidebar */}
      <Sidebar rol={rol} />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 min-h-screen ml-64">
        <Topbar nombre={user.nombre || "Usuario"} rol={rol} />

        <div className="flex flex-1 overflow-hidden">
          {/* Panel lateral de lotes */}
          <aside className="w-72 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
            <div className="p-4 bg-green-600 text-white font-semibold rounded-tr-2xl">
              Lotes activos
            </div>
            <ul className="p-3 space-y-2">
              {lotes.length === 0 ? (
                <p className="text-gray-400 text-center mt-3">Sin lotes</p>
              ) : (
                lotes.map((lote) => (
                  <li
                    key={lote._id}
                    onClick={() => abrirChat(lote)}
                    className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition ${
                      loteActual?._id === lote._id
                        ? "bg-green-100 border border-green-400"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{lote.nombre}</h3>
                      <p className="text-xs text-gray-500">{lote.estado || "activo"}</p>
                    </div>
                    <MessageSquare
                      size={18}
                      className={`${
                        loteActual?._id === lote._id ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                  </li>
                ))
              )}
            </ul>
          </aside>

          {/* Contenido dinámico */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 rounded-tl-2xl">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 💬 Chat flotante (no enganchado) */}
      <ChatPanel open={chatAbierto} onClose={() => setChatAbierto(false)} />
    </div>
  );
}
