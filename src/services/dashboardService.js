import API from "./api";

// Servicio para obtener el resumen del dashboard
export const obtenerResumen = async () => {
  try {
    const { data } = await API.get("/dashboard");
    return data;
  } catch (error) {
    console.error("Error al obtener el resumen del dashboard:", error);
    return null;
  }
};
