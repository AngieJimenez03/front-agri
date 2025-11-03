import { useEffect, useState } from "react";
import LotesGrid from "@/components/lots/LotesGrid";
import LoteModal from "@/components/lots/LoteModal";
import { obtenerLotes, eliminarLote } from "@/services/lotsService";
import { FiPlus } from "react-icons/fi";

export default function Lots() {
  const [lotes, setLotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loteEditando, setLoteEditando] = useState(null);
  const [rolUsuario, setRolUsuario] = useState(null);

  // 🔹 Obtener rol del usuario logueado
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.rol) setRolUsuario(userData.rol);
  }, []);

  // 🔹 Cargar lotes desde API
  async function cargarLotes() {
    try {
      const data = await obtenerLotes();
      console.log("✅ Lotes recibidos desde API:", data);
      setLotes(data);
    } catch (error) {
      console.error("❌ Error al obtener lotes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarLotes();
  }, []);

  // 🔹 Editar lote
  const handleEditar = (lote) => {
    setLoteEditando(lote);
    setShowModal(true);
  };

  // 🔹 Eliminar lote
  const handleEliminar = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este lote?");
    if (!ok) return;
    try {
      await eliminarLote(id);
      alert("✅ Lote eliminado correctamente.");
      cargarLotes();
    } catch (error) {
      console.error("❌ Error al eliminar lote:", error);
      alert("Error al eliminar el lote.");
    }
  };

  // 🔹 Filtro de búsqueda
  const filteredLotes = lotes.filter((lote) =>
    lote.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative p-6">
      {/* Barra superior con buscador y botón */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar lotes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-sm border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* ✅ Botón crear lote — visible solo para ADMIN */}
        {rolUsuario === "admin" && (
          <button
            onClick={() => {
              setLoteEditando(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl px-4 py-2 shadow transition ml-4"
          >
            <FiPlus size={18} />
            Crear lote
          </button>
        )}
      </div>

      {/* Contenido */}
      {loading ? (
        <p className="text-gray-500 text-center">Cargando lotes...</p>
      ) : (
        <LotesGrid
          lotes={filteredLotes}
          onActualizar={cargarLotes}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      )}

      {/* Modal crear/editar */}
      {showModal && (
        <LoteModal
          lote={loteEditando}
          onClose={() => setShowModal(false)}
          onLoteGuardado={() => {
            setShowModal(false);
            setLoteEditando(null);
            cargarLotes();
          }}
        />
      )}
    </div>
  );
}
