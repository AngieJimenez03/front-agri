//src/service/messagesService.js

import api from "./api";

export const getUltimosMensajes = async () => {
  const res = await api.get("/messages"); //  backend usa /api/messages
  return res.data;
};

export const getMensajesPorLote = async (loteId) => {
  const res = await api.get(`/messages/${loteId}`);
  return res.data;
};

export const crearMensaje = async (data) => {
  const res = await api.post("/messages", data);
  return res.data;
};
