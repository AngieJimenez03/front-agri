import { useEffect, useState } from "react";
import LotesGrid from "@/components/lots/LotesGrid";
import { obtenerLotes } from "@/services/lotsService";

export default function Lots() {
  const [lotes, setLotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function cargarLotes() {
    try {
      const data = await obtenerLotes();
      console.log(" Lotes recibidos desde API:", data);
    
      setLotes(data);
    } catch (error) {
      console.error(" Error al obtener lotes:", error);
    } finally {
      setLoading(false);
    }
  }
  cargarLotes();
}, []);

  const filteredLotes = lotes.filter((lote) =>
    lote.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar lotes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Cargando lotes...</p>
      ) : (
        <LotesGrid lotes={filteredLotes} />
      )}
    </div>
  );
}

