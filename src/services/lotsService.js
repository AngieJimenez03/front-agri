// src/services/lotsService.js
import axios from "axios";

const API = "http://localhost:5100/api/lots";

// 🔹 Obtener todos los lotes
export async function obtenerLotes() {
  const token = localStorage.getItem("token");
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // espera array de lotes [{_id, nombre, estado, progreso, ...}]
}

// 🔹 Crear un nuevo lote
export async function crearLote(data) {
  const token = localStorage.getItem("token");
  const res = await axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// 🔹 Actualizar un lote existente
export async function actualizarLote(id, data) {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// 🔹 Eliminar un lote
export async function eliminarLote(id) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
