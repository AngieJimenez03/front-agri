// src/services/lotsService.js
import API from "./api";

export async function obtenerLotes() {
  const res = await API.get("/lots");
  return res.data;
}

export async function crearLote(data) {
  const res = await API.post("/lots", data);
  return res.data;
}

export async function actualizarLote(id, data) {
  const res = await API.put(`/lots/${id}`, data);
  return res.data;
}

export async function eliminarLote(id) {
  const res = await API.delete(`/lots/${id}`);
  return res.data;
}
