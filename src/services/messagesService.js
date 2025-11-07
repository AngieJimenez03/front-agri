//src/service/messagesService.js
import api from "./api"; // tu instancia axios

export const getUltimosMensajes = async () => {
  const res = await api.get("/mensajes/ultimos");
  return res.data;
};

export const getMensajesPorLote = async (loteId) => {
  const res = await api.get(`/mensajes/${loteId}`);
  return res.data;
};

export const crearMensaje = async (data) => {
  const res = await api.post("/mensajes", data);
  return res.data;
};
