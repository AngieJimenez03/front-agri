import API from "./api";

// Servicio para obtener el resumen del dashboard
export const obtenerResumen = async () => {
  try {
    const { data } = await API.get("/dashboard");
    // data = { msg: "...", resumen: { ... } }
    // devolvemos exactamente lo que interesa (el objeto resumen)
    return data?.resumen || null;
  } catch (error) {
    console.error("Error al obtener el resumen del dashboard:", error);
    return null;
  }
};
