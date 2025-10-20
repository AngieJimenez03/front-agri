// src/services/loteService.js
import axios from "axios";

const API = "http://localhost:5100/api/lots";

export async function obtenerLotes() {
  const token = localStorage.getItem("token");
  const res = await axios.get(API, { headers: { Authorization: `Bearer ${token}` } });
  return res.data; // espera array de lotes [{_id,nombre,estado,progreso,...}]
}
