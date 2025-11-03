// src/services/incidentsService.js
import axios from "axios";

// ✅ URL real del backend (según tu router)
const API = "http://localhost:5100/api/incidents";

export async function getIncidents() {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Adaptar los datos a lo que el frontend necesita
    return res.data.map((item) => ({
      id: item._id,
      title: item.descripcion,
      lot: item.lote?.nombre || "Sin lote",
      status: item.estado, // pendiente | en_revision | resuelta
      date: new Date(item.createdAt).toLocaleDateString(),
      reportedBy: item.tecnico?.nombre || "Desconocido",
    }));
  } catch (error) {
    console.error("Error al obtener incidencias:", error);
    return [];
  }
}
